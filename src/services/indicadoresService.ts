import { supabaseClient } from '../lib/supabaseClient'

export type IndicadorResumo = {
  totalAtendimentos: number
  tempoMedioEspera: number
  ocupacaoLeitos: number
}

export async function fetchIndicadores() {
  const response = await supabaseClient.from('indicadores').select()

  return {
    data: (response.data ?? []) as IndicadorResumo[],
    error: response.error,
  }
}
