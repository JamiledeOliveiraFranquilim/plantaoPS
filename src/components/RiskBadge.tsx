type RiskBadgeProps = {
  risk: 'baixo' | 'medio' | 'alto'
}

export function RiskBadge({ risk }: RiskBadgeProps) {
  const palette = {
    baixo: '#22c55e',
    medio: '#f59e0b',
    alto: '#ef4444',
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 999,
        padding: '0.25rem 0.6rem',
        background: `${palette[risk]}22`,
        color: palette[risk],
        fontWeight: 700,
        fontSize: '0.75rem',
      }}
    >
      {risk}
    </span>
  )
}
