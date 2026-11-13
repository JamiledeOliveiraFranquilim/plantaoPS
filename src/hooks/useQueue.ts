import { useQuery } from '@tanstack/react-query';
import type { RiskColor } from '../types/hospital';
import { RISK_CONFIG } from '../types/hospital';
import { supabase } from '../services/supabaseClient.ts';
import { useRealtimeTable } from './useRealtimeTable';

function calcularIdade(dataNascimento: string): number {
  const diff = Date.now() - new Date(dataNascimento).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

export function useQueue() {
  const queryKey = ['fila-atendimento'];
  useRealtimeTable('atendimentos', queryKey);

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('atendimentos')
        .select('*, pacientes(*), triagens(queixa, criado_em)')
        .eq('status', 'aguardando_medico');

      if (error) throw error;

      return (data || []).sort((a: any, b: any) => {
        const pA = RISK_CONFIG[(a.risco_cor ?? 'azul') as RiskColor].priority;
        const pB = RISK_CONFIG[(b.risco_cor ?? 'azul') as RiskColor].priority;
        if (pA !== pB) return pA - pB;

        const timeA = new Date(a.criado_em).getTime();
        const timeB = new Date(b.criado_em).getTime();
        if (timeA !== timeB) return timeA - timeB;

        const idadeA = calcularIdade(a.pacientes?.data_nascimento ?? '2000-01-01');
        const idadeB = calcularIdade(b.pacientes?.data_nascimento ?? '2000-01-01');
        const prioIdadeA = idadeA >= 60 || idadeA < 12 ? 0 : 1;
        const prioIdadeB = idadeB >= 60 || idadeB < 12 ? 0 : 1;
        return prioIdadeA - prioIdadeB;
      });
    },
  });
}