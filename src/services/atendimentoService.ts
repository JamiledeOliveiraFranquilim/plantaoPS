import { supabaseClient } from '../lib/supabaseClient';

export type AtendimentoStatus = 'pendente' | 'em_atendimento' | 'finalizado';

export type Atendimento = {
  id: string;
  paciente: string;
  status: AtendimentoStatus;
  prioridade: 'baixa' | 'media' | 'alta';
};

export async function listAtendimentos() {
  return supabaseClient.from('atendimentos').select();
}

export async function createAtendimento(payload: Partial<Atendimento>) {
  return supabaseClient.from('atendimentos').insert(payload);
}

export async function updateAtendimento(_id: string, updates: Partial<Atendimento>) {
  return supabaseClient.from('atendimentos').update(updates);
}