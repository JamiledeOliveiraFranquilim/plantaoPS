export type UserRole =
  | 'recepcao'
  | 'enfermagem'
  | 'medico'
  | 'gestao'
  | 'painel'

export type RiskColor = 'vermelho' | 'laranja' | 'amarelo' | 'verde' | 'azul'

export type UserProfile = {
  id: string
  nome: string
  role: UserRole
  consultorio?: string
}

export const RISK_CONFIG: Record<
  RiskColor,
  {
    label: string
    priority: number
    timeoutMinutes: number
    color: string
  }
> = {
  vermelho: { label: 'Vermelho', priority: 1, timeoutMinutes: 0, color: '#dc2626' },
  laranja: { label: 'Laranja', priority: 2, timeoutMinutes: 10, color: '#f97316' },
  amarelo: { label: 'Amarelo', priority: 3, timeoutMinutes: 60, color: '#eab308' },
  verde: { label: 'Verde', priority: 4, timeoutMinutes: 120, color: '#22c55e' },
  azul: { label: 'Azul', priority: 5, timeoutMinutes: 240, color: '#3b82f6' },
}
