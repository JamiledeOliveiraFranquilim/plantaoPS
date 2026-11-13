import { RISK_CONFIG, type RiskColor } from '../types/hospital';

type QueueItemProps = {
  id: string;
  nome: string;
  risco: RiskColor;
  tempoEspera: number;
  queixa: string;
  idade: number;
  alerta?: boolean;
};

export function QueueItem({ id, nome, risco, tempoEspera, queixa, idade, alerta = false }: QueueItemProps) {
  const config = RISK_CONFIG[risco];

  return (
    <div
      style={{
        border: alerta ? '2px solid #ef4444' : '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '0.9rem 1rem',
        background: alerta ? '#fff1f2' : '#ffffff',
        display: 'grid',
        gap: 6,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <strong>{id}</strong>
        <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.72rem' }}>
          {alerta ? 'Prazo excedido' : `${config.timeoutMinutes} min`}
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <span>{nome}</span>
        <span style={{ fontSize: '0.72rem', color: '#6b7280' }}>{idade} anos</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: '0.75rem', color: '#374151' }}>{config.label}</span>
        <span style={{ fontSize: '0.75rem', color: '#374151' }}>{tempoEspera} min</span>
      </div>
      <div style={{ fontSize: '0.76rem', color: '#475569' }}>{queixa}</div>
    </div>
  );
}
