type StatCardProps = {
  label: string
  value: string | number
  trend?: string
}

export function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
      <div>{label}</div>
      <strong>{value}</strong>
      {trend ? <div>{trend}</div> : null}
    </div>
  )
}
