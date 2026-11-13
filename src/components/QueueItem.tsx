type QueueItemProps = {
  id: string
  nome: string
  prioridade: 'baixa' | 'media' | 'alta'
  tempoEspera: number
}

export function QueueItem({ id, nome, prioridade, tempoEspera }: QueueItemProps) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
      <strong>{nome}</strong>
      <div>ID: {id}</div>
      <div>Prioridade: {prioridade}</div>
      <div>Tempo de espera: {tempoEspera} min</div>
    </div>
  )
}
