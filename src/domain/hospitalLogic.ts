import type {
  Encounter,
  EncounterStatus,
  Patient,
  RiskColor,
  TriageInput,
  Vitals,
} from '../types/hospital';

export const RISK_PRIORITY: Record<RiskColor, number> = {
  vermelho: 1,
  laranja: 2,
  amarelo: 3,
  verde: 4,
  azul: 5,
};

export const STATUS_TRANSITIONS: Record<EncounterStatus, EncounterStatus[]> = {
  aguardando_triagem: ['aguardando_medico', 'cancelado'],
  aguardando_medico: ['em_atendimento', 'aguardando_medico', 'cancelado'],
  em_atendimento: ['alta', 'aguardando_leito', 'transferido'],
  aguardando_leito: ['observacao'],
  observacao: ['alta', 'transferido'],
  alta: [],
  transferido: [],
  cancelado: [],
};

export function calculateAge(dateOfBirth: string): number {
  if (!dateOfBirth) return 0;

  const birth = new Date(dateOfBirth);
  const today = new Date();
  const diff = today.getTime() - birth.getTime();

  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)));
}

export function classifyRisk(vitals: Partial<Vitals>): { color: RiskColor; reason: string } {
  const sat = Number(vitals.saturacao ?? 100);
  const systolic = Number(vitals.pressaoSistolica ?? 0);
  const heartRate = Number(vitals.frequenciaCardiaca ?? 0);
  const temperature = Number(vitals.temperatura ?? 36.5);
  const pain = Number(vitals.dor ?? 0);
  const levelOfConsciousness = vitals.nivelConsciencia ?? 'alerta';

  if (sat < 90 || systolic < 80 || heartRate < 40 || heartRate > 140 || levelOfConsciousness === 'inconsciente') {
    return { color: 'vermelho', reason: 'Critério mais grave: risco imediato.' };
  }

  if (
    (sat >= 90 && sat <= 93) ||
    temperature >= 40 ||
    temperature <= 35 ||
    (pain >= 8 && pain <= 10) ||
    (heartRate >= 121 && heartRate <= 140) ||
    levelOfConsciousness === 'confuso'
  ) {
    return { color: 'laranja', reason: 'Critério mais grave: muito urgente.' };
  }

  if (
    (temperature >= 38.5 && temperature <= 39.9) ||
    (pain >= 5 && pain <= 7) ||
    systolic >= 180
  ) {
    return { color: 'amarelo', reason: 'Critério mais grave: urgente.' };
  }

  if (
    (temperature >= 37.8 && temperature <= 38.4) ||
    (pain >= 1 && pain <= 4)
  ) {
    return { color: 'verde', reason: 'Critério mais grave: pouco urgente.' };
  }

  return { color: 'azul', reason: 'Nenhum critério acima foi identificado.' };
}

export function sortEncountersByQueue(encounters: Encounter[]): Encounter[] {
  return [...encounters].sort((a, b) => {
    const priorityDiff = RISK_PRIORITY[a.riskColor ?? 'azul'] - RISK_PRIORITY[b.riskColor ?? 'azul'];
    if (priorityDiff !== 0) return priorityDiff;

    const waitA = Date.now() - new Date(a.createdAt).getTime();
    const waitB = Date.now() - new Date(b.createdAt).getTime();
    if (waitA !== waitB) return waitB - waitA;

    const ageA = calculateAge(a.patient?.dataNascimento ?? '2000-01-01');
    const ageB = calculateAge(b.patient?.dataNascimento ?? '2000-01-01');
    const priorityAgeA = ageA >= 60 || ageA < 12 ? 0 : 1;
    const priorityAgeB = ageB >= 60 || ageB < 12 ? 0 : 1;
    if (priorityAgeA !== priorityAgeB) return priorityAgeA - priorityAgeB;

    return a.code.localeCompare(b.code);
  });
}

export function canTransition(current: EncounterStatus, next: EncounterStatus): boolean {
  return STATUS_TRANSITIONS[current]?.includes(next) ?? false;
}

export function getNextTicketCode(encounters: Encounter[]): string {
  const numbers = encounters
    .map((encounter) => Number((encounter.code ?? '').replace(/\D/g, '')))
    .filter((value) => Number.isFinite(value));

  const max = numbers.length ? Math.max(...numbers) : 0;
  return `A${String(max + 1).padStart(3, '0')}`;
}

export function findPatientByNameOrBirth(patients: Patient[], term: string): Patient[] {
  const value = term.trim().toLowerCase();
  if (!value) return patients;

  return patients.filter((p) => {
    const name = p.nome.toLowerCase();
    const birth = p.dataNascimento;
    const matchesName = name.includes(value);
    const matchesBirth = birth.includes(value);
    return matchesName || matchesBirth;
  });
}

export function getEncounterQueue(encounters: Encounter[]): Encounter[] {
  return sortEncountersByQueue(
    encounters.filter((encounter) => ['aguardando_triagem', 'aguardando_medico', 'em_atendimento'].includes(encounter.status)),
  );
}

export function getRiskLabel(color: RiskColor): string {
  return {
    vermelho: 'Vermelho',
    laranja: 'Laranja',
    amarelo: 'Amarelo',
    verde: 'Verde',
    azul: 'Azul',
  }[color];
}

export function buildTriagePayload(values: Partial<TriageInput>) {
  const result = classifyRisk(values);
  return {
    ...values,
    riskColor: result.color,
    riskReason: result.reason,
  };
}

export function isMedicationBlocked(patientAllergies: string[], medicationName: string, dose: number, maxDose: number): boolean {
  const normalized = medicationName.toLowerCase();
  const blockedByAllergy = patientAllergies.some((allergy) => allergy.toLowerCase().includes(normalized) || normalized.includes(allergy.toLowerCase()));
  const blockedByDose = dose > maxDose;

  return blockedByAllergy || blockedByDose;
}
