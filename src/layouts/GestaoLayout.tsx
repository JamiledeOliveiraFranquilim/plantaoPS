import { useMemo } from 'react';
import { StatCard } from '../components/StatCard';
import { useHospitalData } from '../context/HospitalContext';
import { RISK_CONFIG } from '../types/hospital';

type GestaoLayoutProps = {
  children?: React.ReactNode
}

export function GestaoLayout(_props: GestaoLayoutProps) {
  const { encounters, beds, calls } = useHospitalData();

  const metrics = useMemo(() => {
    const total = encounters.length;
    const vermelho = encounters.filter((encounter) => encounter.riskColor === 'vermelho').length;
    const laranja = encounters.filter((encounter) => encounter.riskColor === 'laranja').length;
    const amarelo = encounters.filter((encounter) => encounter.riskColor === 'amarelo').length;
    const verde = encounters.filter((encounter) => encounter.riskColor === 'verde').length;
    const occupancy = ((beds.filter((bed) => bed.status === 'ocupado').length / beds.length) * 100).toFixed(0);

    return [
      { label: 'Atendimentos hoje', value: total },
      { label: 'Fila por cor', value: `${vermelho + laranja + amarelo + verde}` },
      { label: 'Leitos ocupados', value: `${occupancy}%` },
      { label: 'Chamadas', value: calls.length },
    ];
  }, [beds, calls.length, encounters]);

  return (
    <div style={{ padding: 24, display: 'grid', gap: 20 }}>
      <h2>Painel da gestão</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))', gap: 16 }}>
        {metrics.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} trend="em alta" />
        ))}
      </div>

      <section style={{ background: '#fff', borderRadius: 16, padding: 18, border: '1px solid #e5e7eb' }}>
        <h3>Distribuição por cor</h3>
        <div style={{ display: 'grid', gap: 10 }}>
          {Object.entries(RISK_CONFIG).map(([color, config]) => {
            const count = encounters.filter((encounter) => encounter.riskColor === color).length;
            return (
              <div key={color} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{config.label}</span>
                <strong>{count}</strong>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
