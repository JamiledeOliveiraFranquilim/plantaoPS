export type UserRole =
  | 'recepcao'
  | 'enfermagem'
  | 'medico'
  | 'gestao'
  | 'painel'

export type RiskColor = 'vermelho' | 'laranja' | 'amarelo' | 'verde' | 'azul'

export type BedStatus = 'livre' | 'ocupado' | 'limpeza' | 'bloqueado'

export type EncounterStatus =
  | 'aguardando_triagem'
  | 'aguardando_medico'
  | 'em_atendimento'
  | 'aguardando_leito'
  | 'observacao'
  | 'alta'
  | 'transferido'
  | 'cancelado'

export type UserProfile = {
  id: string
  nome: string
  role: UserRole
  consultorio?: string
}

export type Patient = {
  id: string
  nome: string
  dataNascimento: string
  sexo: 'F' | 'M' | 'Outro'
  telefone: string
  alergias: string[]
  createdAt: string
}

export type Vitals = {
  pressaoArterial: string
  pressaoSistolica: number
  frequenciaCardiaca: number
  temperatura: number
  saturacao: number
  dor: number
  nivelConsciencia: 'alerta' | 'confuso' | 'inconsciente'
  queixaPrincipal: string
}

export type TriageInput = Vitals & {
  riskColor?: RiskColor
  riskReason?: string
  justificativa?: string
}

export type Encounter = {
  id: string
  code: string
  patientId: string
  patient?: Patient
  status: EncounterStatus
  riskColor?: RiskColor
  createdAt: string
  queueOrder?: number
  waitingMinutes?: number
}

export type Bed = {
  id: string
  numero: string
  ala: string
  status: BedStatus
}

export type Medication = {
  id: string
  nome: string
  doseMaxima: number
  via: string
  frequencia: string
}

export type DashboardMetric = {
  label: string
  value: string | number
  trend?: string
}

export const RISK_CONFIG: Record<
  RiskColor,
  {
    label: string
    priority: number
    timeoutMinutes: number
    color: string
    description: string
  }
> = {
  vermelho: { label: 'Vermelho', priority: 1, timeoutMinutes: 0, color: '#dc2626', description: 'Emergência' },
  laranja: { label: 'Laranja', priority: 2, timeoutMinutes: 10, color: '#f97316', description: 'Muito urgente' },
  amarelo: { label: 'Amarelo', priority: 3, timeoutMinutes: 60, color: '#eab308', description: 'Urgente' },
  verde: { label: 'Verde', priority: 4, timeoutMinutes: 120, color: '#22c55e', description: 'Pouco urgente' },
  azul: { label: 'Azul', priority: 5, timeoutMinutes: 240, color: '#3b82f6', description: 'Não urgente' },
}
