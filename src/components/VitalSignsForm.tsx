type VitalSignsFormProps = {
  patientName: string
}

export function VitalSignsForm({ patientName }: VitalSignsFormProps) {
  return (
    <form>
      <h3>Sinais vitais</h3>
      <p>Paciente: {patientName}</p>
      <label>
        Pressão
        <input type="text" defaultValue="120/80" />
      </label>
      <label>
        FC
        <input type="text" defaultValue="72" />
      </label>
      <button type="submit">Salvar</button>
    </form>
  )
}
