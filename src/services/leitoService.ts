import { supabaseClient } from '../lib/supabaseClient'

export type LeitoStatus = 'disponivel' | 'ocupado' | 'manutencao'

export type Leito = {
  id: string
  numero: string
  status: LeitoStatus
  especialidade: string
}

export async function listLeitos() {
  return supabaseClient.from('leitos').select()
}

export async function updateLeito(_id: string, updates: Partial<Leito>) {
  return supabaseClient.from('leitos').update(updates)
}
