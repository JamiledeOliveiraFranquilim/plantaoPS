type BedTileProps = {
  numero: string
  status: 'disponivel' | 'ocupado' | 'manutencao'
  especialidade: string
}

export function BedTile({ numero, status, especialidade }: BedTileProps) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
      <div>Leito {numero}</div>
      <div>Status: {status}</div>
      <div>Especialidade: {especialidade}</div>
    </div>
  )
}
