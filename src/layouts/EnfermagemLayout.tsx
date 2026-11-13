import { useMemo, useState } from 'react';
import { VitalSignsForm, type VitalSignsFormValues } from '../components/VitalSignsForm';
import { useHospitalData } from '../context/HospitalContext';
import { classifyRisk, getEncounterQueue } from '../domain/hospitalLogic';
import type { Encounter } from '../types/hospital';

type EnfermagemLayoutProps = {
  children?: React.ReactNode
}

export function EnfermagemLayout(_props: EnfermagemLayoutProps) {
  const { encounters, triageEncounter } = useHospitalData();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const queue = useMemo(
    () => getEncounterQueue(encounters).filter((encounter) => encounter.status === 'aguardando_triagem' || encounter.status === 'aguardando_medico'),
    [encounters],
  );

  const selected = queue.find((encounter) => encounter.id === selectedId) ?? queue[0];

  const handleSubmit = (values: VitalSignsFormValues) => {
    if (!selected) return;
    const suggested = classifyRisk(values);
    triageEncounter(selected.id, { ...values, riskColor: suggested.color, justificativa: 'Classificação automática da triagem' });
  };

  return (
    <div style={{ padding: 24, display: 'grid', gap: 20 }}>
      <h2>Triagem (enfermagem)</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 20 }}>
        <section style={{ background: '#fff', borderRadius: 16, padding: 18, border: '1px solid #e5e7eb' }}>
          <h3>Pacientes aguardando triagem</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {queue.length === 0 ? <div>Sem pacientes na fila.</div> : queue.map((encounter: Encounter) => (
              <button
                key={encounter.id}
                type="button"
                onClick={() => setSelectedId(encounter.id)}
                style={{
                  textAlign: 'left',
                  border: selected?.id === encounter.id ? '2px solid #0f172a' : '1px solid #e5e7eb',
                  background: '#fff',
                  borderRadius: 12,
                  padding: 12,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{encounter.code}</strong>
                  <span>{encounter.status}</span>
                </div>
                <div>{encounter.patient?.nome}</div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ background: '#fff', borderRadius: 16, padding: 18, border: '1px solid #e5e7eb' }}>
          {selected ? (
            <VitalSignsForm patientName={selected.patient?.nome ?? 'Paciente'} onSubmit={handleSubmit} />
          ) : (
            <div>Selecione um paciente para triagem.</div>
          )}
        </section>
      </div>
    </div>
  );
}
