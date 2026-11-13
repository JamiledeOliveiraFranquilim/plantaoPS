import type { RiskColor } from '../types/hospital';
import { RISK_CONFIG } from '../types/hospital';

type RiskBadgeProps = {
  risk: RiskColor | 'todos';
  label?: string;
  compact?: boolean;
};

export function RiskBadge({ risk, label, compact = false }: RiskBadgeProps) {
  const palette: Record<RiskColor, { background: string; color: string; border: string }> = {
    vermelho: { background: '#fee2e2', color: '#991b1b', border: '#fca5a5' },
    laranja: { background: '#ffedd5', color: '#9a4d00', border: '#fdba74' },
    amarelo: { background: '#fef3c7', color: '#92400e', border: '#fcd34d' },
    verde: { background: '#dcfce7', color: '#166534', border: '#86efac' },
    azul: { background: '#dbeafe', color: '#1d4ed8', border: '#93c5fd' },
  };

  const color = risk === 'todos' ? { background: '#e5e7eb', color: '#111827', border: '#d1d5db' } : palette[risk];
  const text = label ?? (risk === 'todos' ? 'Todos' : RISK_CONFIG[risk].label);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: compact ? '0.28rem 0.55rem' : '0.38rem 0.75rem',
        borderRadius: 999,
        background: color.background,
        color: color.color,
        border: `1px solid ${color.border}`,
        fontWeight: 800,
        fontSize: compact ? '0.7rem' : '0.78rem',
        letterSpacing: '0.02em',
      }}
    >
      {text}
    </span>
  );
}
