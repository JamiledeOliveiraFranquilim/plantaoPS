import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { classifyRisk, getEncounterQueue, getNextTicketCode } from '../domain/hospitalLogic';
import type {
  Bed,
  BedStatus,
  Encounter,
  EncounterStatus,
  Medication,
  Patient,
  RiskColor,
  TriageInput,
} from '../types/hospital';

const STORAGE_KEY = 'plantaops-hospital-demo';

type CallItem = {
  id: string;
  code: string;
  consultorio: string;
  createdAt: string;
};

type HospitalState = {
  patients: Patient[];
  encounters: Encounter[];
  beds: Bed[];
  medications: Medication[];
  calls: CallItem[];
};

type HospitalContextValue = {
  state: HospitalState;
  patients: Patient[];
  encounters: Encounter[];
  beds: Bed[];
  medications: Medication[];
  calls: CallItem[];
  addPatient: (input: Partial<Patient> & Pick<Patient, 'nome' | 'dataNascimento' | 'sexo' | 'telefone'>) => Patient;
  openEncounter: (patientId: string) => { error?: string; encounter?: Encounter };
  triageEncounter: (encounterId: string, input: Partial<TriageInput> & Pick<TriageInput, 'queixaPrincipal'>) => { error?: string; encounter?: Encounter };
  callNextPatient: (consultorio: string) => { error?: string; call?: CallItem };
  prescribeMedication: (encounterId: string, medicationId: string, dose: number) => { error?: string };
  assignBed: (patientId: string, bedId: string) => { error?: string };
  releaseBed: (bedId: string) => void;
  setBedToCleaning: (bedId: string) => void;
  setCallQueue: (calls: CallItem[]) => void;
};

const initialMedications: Medication[] = [
  { id: 'med-1', nome: 'Paracetamol', doseMaxima: 1000, via: 'oral', frequencia: '8/8h' },
  { id: 'med-2', nome: 'Dipirona', doseMaxima: 1000, via: 'oral', frequencia: '6/6h' },
  { id: 'med-3', nome: 'Amoxicilina', doseMaxima: 500, via: 'oral', frequencia: '12/12h' },
  { id: 'med-4', nome: 'Ibuprofeno', doseMaxima: 800, via: 'oral', frequencia: '8/8h' },
];

const defaultState: HospitalState = {
  patients: [
    {
      id: 'p-1',
      nome: 'Ana Souza',
      dataNascimento: '2008-04-15',
      sexo: 'F',
      telefone: '(11) 98888-1001',
      alergias: ['Penicilina'],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p-2',
      nome: 'Bruno Silva',
      dataNascimento: '1965-08-22',
      sexo: 'M',
      telefone: '(11) 97777-2002',
      alergias: ['Dipirona'],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p-3',
      nome: 'Carla Mendes',
      dataNascimento: '1998-06-03',
      sexo: 'F',
      telefone: '(11) 96666-3003',
      alergias: [],
      createdAt: new Date().toISOString(),
    },
  ],
  encounters: [
    {
      id: 'e-1',
      code: 'A001',
      patientId: 'p-1',
      status: 'aguardando_medico',
      riskColor: 'verde',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      patient: {
        id: 'p-1',
        nome: 'Ana Souza',
        dataNascimento: '2008-04-15',
        sexo: 'F',
        telefone: '(11) 98888-1001',
        alergias: ['Penicilina'],
        createdAt: new Date().toISOString(),
      },
    },
    {
      id: 'e-2',
      code: 'A002',
      patientId: 'p-2',
      status: 'aguardando_triagem',
      riskColor: 'azul',
      createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      patient: {
        id: 'p-2',
        nome: 'Bruno Silva',
        dataNascimento: '1965-08-22',
        sexo: 'M',
        telefone: '(11) 97777-2002',
        alergias: ['Dipirona'],
        createdAt: new Date().toISOString(),
      },
    },
    {
      id: 'e-3',
      code: 'A003',
      patientId: 'p-3',
      status: 'em_atendimento',
      riskColor: 'vermelho',
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      patient: {
        id: 'p-3',
        nome: 'Carla Mendes',
        dataNascimento: '1998-06-03',
        sexo: 'F',
        telefone: '(11) 96666-3003',
        alergias: [],
        createdAt: new Date().toISOString(),
      },
    },
  ],
  beds: [
    { id: 'bed-1', numero: '01', ala: 'Sala Vermelha', status: 'livre' },
    { id: 'bed-2', numero: '02', ala: 'Sala Vermelha', status: 'ocupado' },
    { id: 'bed-3', numero: '03', ala: 'Observação', status: 'livre' },
    { id: 'bed-4', numero: '04', ala: 'Observação', status: 'limpeza' },
  ],
  medications: initialMedications,
  calls: [
    { id: 'call-1', code: 'A023', consultorio: 'Consultório 03', createdAt: new Date().toISOString() },
    { id: 'call-2', code: 'A022', consultorio: 'Consultório 01', createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
  ],
};

function loadHospitalState(): HospitalState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as HospitalState;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

const HospitalContext = createContext<HospitalContextValue | undefined>(undefined);

export function HospitalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HospitalState>(loadHospitalState);

  const persistState = useCallback((nextState: HospitalState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    window.dispatchEvent(new CustomEvent('plantaops-realtime'));
  }, []);

  useEffect(() => {
    persistState(state);
  }, [persistState, state]);

  const addPatient = useCallback((input: Partial<Patient> & Pick<Patient, 'nome' | 'dataNascimento' | 'sexo' | 'telefone'>) => {
    const patient: Patient = {
      id: `p-${Date.now()}`,
      nome: input.nome,
      dataNascimento: input.dataNascimento,
      sexo: input.sexo,
      telefone: input.telefone,
      alergias: input.alergias ?? [],
      createdAt: new Date().toISOString(),
    };

    setState((current) => ({ ...current, patients: [patient, ...current.patients] }));
    return patient;
  }, []);

  const openEncounter = useCallback((patientId: string) => {
    let result: { error?: string; encounter?: Encounter } = { error: 'Paciente não encontrado.' };

    setState((current) => {
      const patient = current.patients.find((item) => item.id === patientId);
      if (!patient) return current;

      const activeEncounter = current.encounters.some(
        (encounter) => encounter.patientId === patientId && !['alta', 'transferido', 'cancelado'].includes(encounter.status),
      );

      if (activeEncounter) {
        result = { error: 'Paciente já possui atendimento ativo.' };
        return current;
      }

      const nextCode = getNextTicketCode(current.encounters);
      const encounter: Encounter = {
        id: `e-${Date.now()}`,
        code: nextCode,
        patientId: patient.id,
        status: 'aguardando_triagem',
        riskColor: 'azul',
        patient,
        createdAt: new Date().toISOString(),
      };

      const next = {
        ...current,
        encounters: [encounter, ...current.encounters],
      };
      result = { encounter };
      return next;
    });

    return result;
  }, []);

  const triageEncounter = useCallback((encounterId: string, input: Partial<TriageInput> & Pick<TriageInput, 'queixaPrincipal'>) => {
    let result: { error?: string; encounter?: Encounter } = { error: 'Atendimento não encontrado.' };

    setState((current) => {
      const encounterIndex = current.encounters.findIndex((item) => item.id === encounterId);
      if (encounterIndex < 0) return current;

      const encounter = current.encounters[encounterIndex];
      const suggested = classifyRisk({
        pressaoSistolica: Number(input.pressaoSistolica ?? 120),
        frequenciaCardiaca: Number(input.frequenciaCardiaca ?? 72),
        temperatura: Number(input.temperatura ?? 36.8),
        saturacao: Number(input.saturacao ?? 98),
        dor: Number(input.dor ?? 0),
        nivelConsciencia: input.nivelConsciencia ?? 'alerta',
      });

      const finalColor = (input.riskColor ?? suggested.color) as RiskColor;
      if (finalColor !== suggested.color && !input.justificativa) {
        result = { error: 'A justificativa é obrigatória ao alterar a cor sugerida.' };
        return current;
      }

      const nextEncounter: Encounter = {
        ...encounter,
        riskColor: finalColor,
        status: 'aguardando_medico',
      };

      const next = {
        ...current,
        encounters: current.encounters.map((item) => (item.id === encounterId ? nextEncounter : item)),
      };
      result = { encounter: nextEncounter };
      return next;
    });

    return result;
  }, []);

  const callNextPatient = useCallback((consultorio: string) => {
    let result: { error?: string; call?: CallItem } = { error: 'Não há pacientes na fila.' };

    setState((current) => {
      const queue = getEncounterQueue(current.encounters).filter((encounter) => encounter.status === 'aguardando_medico');
      if (!queue.length) return current;

      const next = queue[0];
      const call: CallItem = {
        id: `call-${Date.now()}`,
        code: next.code,
        consultorio,
        createdAt: new Date().toISOString(),
      };

      const updated = {
        ...current,
        encounters: current.encounters.map((encounter) =>
          encounter.id === next.id ? { ...encounter, status: 'em_atendimento' as EncounterStatus } : encounter,
        ),
        calls: [call, ...current.calls].slice(0, 5),
      };
      result = { call };
      return updated;
    });

    return result;
  }, []);

  const prescribeMedication = useCallback((encounterId: string, medicationId: string, dose: number) => {
    let result: { error?: string } = { error: 'Não foi possível registrar a prescrição.' };

    setState((current) => {
      const encounter = current.encounters.find((item) => item.id === encounterId);
      const medication = current.medications.find((item) => item.id === medicationId);

      if (!encounter || !medication) {
        result = { error: 'Paciente ou medicamento não encontrado.' };
        return current;
      }

      const patient = current.patients.find((item) => item.id === encounter.patientId);
      const allergies = patient?.alergias ?? [];
      const medicationName = medication.nome.toLowerCase();
      const hasAllergy = allergies.some((allergy) => allergy.toLowerCase().includes(medicationName));

      if (hasAllergy || dose > medication.doseMaxima) {
        result = {
          error: hasAllergy
            ? 'Prescrição bloqueada: paciente alérgico ao medicamento.'
            : 'Prescrição bloqueada: dose acima da máxima permitida.',
        };
        return current;
      }

      result = {};
      return current;
    });

    return result;
  }, []);

  const assignBed = useCallback((patientId: string, bedId: string) => {
    let result: { error?: string } = { error: 'Não foi possível alocar o leito.' };

    setState((current) => {
      const bed = current.beds.find((item) => item.id === bedId);
      if (!bed || bed.status !== 'livre') {
        result = { error: 'Leito indisponível.' };
        return current;
      }

      const encounter = current.encounters.find((item) => item.patientId === patientId && item.status === 'aguardando_leito');
      if (!encounter) {
        result = { error: 'Paciente não está aguardando leito.' };
        return current;
      }

      const next = {
        ...current,
        beds: current.beds.map((item) => (item.id === bedId ? { ...item, status: 'ocupado' as BedStatus } : item)),
        encounters: current.encounters.map((item) =>
          item.id === encounter.id ? { ...item, status: 'observacao' as EncounterStatus } : item,
        ),
      };
      result = {};
      return next;
    });

    return result;
  }, []);

  const releaseBed = useCallback((bedId: string) => {
    setState((current) => ({
      ...current,
      beds: current.beds.map((item) => (item.id === bedId ? { ...item, status: 'limpeza' as BedStatus } : item)),
    }));
  }, []);

  const setBedToCleaning = useCallback((bedId: string) => {
    setState((current) => ({
      ...current,
      beds: current.beds.map((item) => (item.id === bedId ? { ...item, status: 'livre' as BedStatus } : item)),
    }));
  }, []);

  const setCallQueue = useCallback((calls: CallItem[]) => {
    setState((current) => ({ ...current, calls }));
  }, []);

  const value = useMemo<HospitalContextValue>(
    () => ({
      state,
      patients: state.patients,
      encounters: state.encounters,
      beds: state.beds,
      medications: state.medications,
      calls: state.calls,
      addPatient,
      openEncounter,
      triageEncounter,
      callNextPatient,
      prescribeMedication,
      assignBed,
      releaseBed,
      setBedToCleaning,
      setCallQueue,
    }),
    [addPatient, assignBed, callNextPatient, openEncounter, prescribeMedication, releaseBed, setBedToCleaning, setCallQueue, state, triageEncounter],
  );

  return <HospitalContext.Provider value={value}>{children}</HospitalContext.Provider>;
}

export function useHospitalData() {
  const context = useContext(HospitalContext);
  if (!context) throw new Error('useHospitalData must be used inside HospitalProvider');
  return context;
}
