import { useMemo, useState } from 'react';
import { QueueItem } from '../components/QueueItem';
import { RiskBadge } from '../components/RiskBadge';
import { useHospitalData } from '../context/HospitalContext';
import { getEncounterQueue } from '../domain/hospitalLogic';

export function MedicoLayout() {
  const { encounters, calls, callNextPatient, prescribeMedication, medications } = useHospitalData();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [medicationId, setMedicationId] = useState('med-1');
  const [dose, setDose] = useState('500');

  const queue = useMemo(() => getEncounterQueue(encounters).filter((encounter) => encounter.status === 'aguardando_medico' || encounter.status === 'em_atendimento'), [encounters]);
  const selected = queue.find((encounter) => encounter.id === selectedId) ?? queue[0];

  const handleCall = () => {
    callNextPatient('Consultório 01');
  };

  const confirmPrescription = () => {
    if (!selected) return;
    prescribeMedication(selected.id, medicationId, Number(dose));
  };

  return (
    <div style={{ padding: 24, display: 'grid', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Atendimento médico</h2>
        <button type="button" onClick={handleCall} style={{ background: '#111827', color: '#fff', border: 'none', borderRadius: 10, padding: '0.8rem 1rem' }}>
          Chamar próximo
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 20 }}>
        <section style={{ background: '#fff', borderRadius: 16, padding: 18, border: '1px solid #e5e7eb' }}>
          <h3>Fila priorizada</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {queue.map((encounter) => (
              <button key={encounter.id} type="button" onClick={() => setSelectedId(encounter.id)} style={{ border: selected?.id === encounter.id ? '2px solid #0f172a' : '1px solid #e5e7eb', background: '#fff', borderRadius: 12, padding: 10, textAlign: 'left' }}>
                <QueueItem
                  id={encounter.code}
                  nome={encounter.patient?.nome ?? 'Paciente'}
                  risco={encounter.riskColor ?? 'azul'}
                  tempoEspera={Math.max(1, Math.round((Date.now() - new Date(encounter.createdAt).getTime()) / (60 * 1000)))}
                  queixa="Consulta médica"
                  idade={encounter.patient ? new Date().getFullYear() - new Date(encounter.patient.dataNascimento).getFullYear() : 0}
                />
              </button>
            ))}
          </div>
        </section>

        <section style={{ background: '#fff', borderRadius: 16, padding: 18, border: '1px solid #e5e7eb', display: 'grid', gap: 16 }}>
          {selected ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{selected.patient?.nome}</h3>
                  <div style={{ color: '#475569' }}>{selected.patient?.telefone}</div>
                </div>
                <RiskBadge risk={selected.riskColor ?? 'azul'} />
              </div>

              <div style={{ display: 'grid', gap: 8 }}>
                <div><strong>Alergias:</strong> {selected.patient?.alergias?.join(', ') || 'Nenhuma'}</div>
                <div><strong>Triagem atual:</strong> {selected.riskColor}</div>
                <div><strong>Status:</strong> {selected.status}</div>
              </div>

              <div style={{ display: 'grid', gap: 10 }}>
                <label>
                  Medicamento
                  <select value={medicationId} onChange={(event) => setMedicationId(event.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #d1d5db', marginTop: 6 }}>
                    {medications.map((medication) => (
                      <option key={medication.id} value={medication.id}>{medication.nome}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Dose
                  <input type="number" value={dose} onChange={(event) => setDose(event.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #d1d5db', marginTop: 6 }} />
                </label>

                <button type="button" onClick={confirmPrescription} style={{ padding: '0.8rem', borderRadius: 10, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 700 }}>
                  Registrar prescrição
                </button>
              </div>
            </>
          ) : (
            <div>Não há pacientes ativos.</div>
          )}

          <div style={{ display: 'grid', gap: 8 }}>
            <strong>Últimas chamadas</strong>
            {calls.slice(0, 5).map((call) => (
              <div key={call.id} style={{ fontSize: '0.8rem', color: '#475569' }}>
                {call.code} · {call.consultorio}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
