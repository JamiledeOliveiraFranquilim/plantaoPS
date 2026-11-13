import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { classifyRisk } from '../domain/hospitalLogic';

const schema = z.object({
  pressaoSistolica: z.number().min(40).max(220),
  frequenciaCardiaca: z.number().min(20).max(220),
  temperatura: z.number().min(32).max(45),
  saturacao: z.number().min(0).max(100),
  dor: z.number().min(0).max(10),
  nivelConsciencia: z.enum(['alerta', 'confuso', 'inconsciente']),
  queixaPrincipal: z.string().min(3),
});

export type VitalSignsFormValues = z.infer<typeof schema>;

type VitalSignsFormProps = {
  patientName: string;
  onSubmit: (values: VitalSignsFormValues) => void;
  defaultValues?: Partial<VitalSignsFormValues>;
};

export function VitalSignsForm({ patientName, onSubmit, defaultValues }: VitalSignsFormProps) {
  const { register, handleSubmit, watch } = useForm<VitalSignsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      pressaoSistolica: 120,
      frequenciaCardiaca: 72,
      temperatura: 36.8,
      saturacao: 98,
      dor: 0,
      nivelConsciencia: 'alerta',
      queixaPrincipal: 'Dor e febre',
      ...defaultValues,
    },
  });

  const values = watch();
  const suggestion = classifyRisk(values);

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values))} style={{ display: 'grid', gap: 12 }}>
      <h3 style={{ margin: 0 }}>Sinais vitais</h3>
      <div style={{ fontSize: '0.9rem', color: '#374151' }}>Paciente: {patientName}</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Pressão sistólica</span>
          <input type="number" {...register('pressaoSistolica')} />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Frequência cardíaca</span>
          <input type="number" {...register('frequenciaCardiaca')} />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Temperatura</span>
          <input type="number" step="0.1" {...register('temperatura')} />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Saturação</span>
          <input type="number" {...register('saturacao')} />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Dor (0-10)</span>
          <input type="number" {...register('dor')} />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Nível de consciência</span>
          <select {...register('nivelConsciencia')}>
            <option value="alerta">Alerta</option>
            <option value="confuso">Confuso</option>
            <option value="inconsciente">Inconsciente</option>
          </select>
        </label>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Queixa principal</span>
        <input {...register('queixaPrincipal')} />
      </label>

      <div style={{ padding: 10, borderRadius: 10, background: '#eff6ff', color: '#1d4ed8', fontWeight: 700 }}>
        Cor sugerida: {suggestion.color} · {suggestion.reason}
      </div>

      <button type="submit" style={{ padding: '0.7rem 1rem', borderRadius: 10, border: 'none', background: '#111827', color: '#fff', fontWeight: 700 }}>
        Salvar triagem
      </button>
    </form>
  );
}
