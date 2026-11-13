type StatCardProps = {
  label: string
  value: string | number
  trend?: string
}

export function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 14,
        padding: '0.9rem 1rem',
        background: '#ffffff',
        boxShadow: '0 6px 18px rgba(15,23,42,0.04)',
        display: 'grid',
        gap: 8,
      }}
    >
      <div
        style={{
          color: '#6b7280',
          fontSize: '0.76rem',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </div>
      <strong style={{ fontSize: '1.6rem', color: '#111827' }}>{value}</strong>
      {trend ? (
        <div style={{ fontSize: '0.75rem', color: '#059669' }}>{trend}</div>
      ) : null}
    </div>
  )
}
