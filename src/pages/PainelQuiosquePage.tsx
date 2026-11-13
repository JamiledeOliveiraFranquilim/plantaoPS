import { useHospitalData } from '../context/HospitalContext';

export function PainelQuiosquePage() {
  const { calls } = useHospitalData();
  const current = calls[0];

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0f172a', color: '#f8fafc' }}>
      <div style={{ textAlign: 'center', width: 'min(760px, 90vw)' }}>
        <p style={{ letterSpacing: 3, textTransform: 'uppercase', opacity: 0.8, marginBottom: 16 }}>Painel de chamadas</p>
        <div style={{ background: '#111827', borderRadius: 24, padding: '2rem 1.5rem', border: '1px solid rgba(148,163,184,0.35)' }}>
          <div style={{ fontSize: '1.1rem', opacity: 0.8 }}>Senha atual</div>
          <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', margin: '0.2rem 0 1rem' }}>{current?.code ?? 'A000'}</h1>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{current?.consultorio ?? 'Consultório 01'}</div>
        </div>

        <div style={{ marginTop: 18, display: 'grid', gap: 10, textAlign: 'left' }}>
          {calls.slice(0, 5).map((call) => (
            <div key={call.id} style={{ display: 'flex', justifyContent: 'space-between', background: '#111827', borderRadius: 12, padding: '0.8rem 1rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{call.code}</span>
              <span style={{ opacity: 0.8 }}>{call.consultorio}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
