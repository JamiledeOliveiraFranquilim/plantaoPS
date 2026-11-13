import { useMemo, useState } from 'react';
import { RiskBadge } from '../components/RiskBadge';
import { useHospitalData } from '../context/HospitalContext';
import { calculateAge } from '../domain/hospitalLogic';

export function RecepcaoLayout() {
  const { patients, encounters, addPatient, openEncounter } = useHospitalData();
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    nome: '',
    dataNascimento: '',
    sexo: 'F',
    telefone: '',
    alergias: '',
  });

  const filteredPatients = useMemo(() => {
    if (!search.trim()) return patients;
    return patients.filter((patient) => {
      const query = search.toLowerCase();
      return (
        patient.nome.toLowerCase().includes(query) ||
        patient.dataNascimento.includes(query) ||
        patient.telefone.includes(query)
      );
    });
  }, [patients, search]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.nome || !form.dataNascimento || !form.telefone) return;

    addPatient({
      nome: form.nome,
      dataNascimento: form.dataNascimento,
      sexo: form.sexo as 'F' | 'M' | 'Outro',
      telefone: form.telefone,
      alergias: form.alergias ? form.alergias.split(',').map((item) => item.trim()).filter(Boolean) : [],
    });

    setForm({ nome: '', dataNascimento: '', sexo: 'F', telefone: '', alergias: '' });
  };

  return (
    <div style={{ padding: 24, display: 'grid', gap: 20 }}>
      <h2>Recepção</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 20 }}>
        <section style={{ background: '#fff', borderRadius: 16, padding: 18, border: '1px solid #e5e7eb' }}>
          <h3>Buscar paciente</h3>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nome ou data de nascimento"
            style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #d1d5db', marginBottom: 12 }}
          />

          <div style={{ display: 'grid', gap: 10 }}>
            {filteredPatients.map((patient) => {
              const activeEncounter = encounters.some(
                (encounter) => encounter.patientId === patient.id && !['alta', 'transferido', 'cancelado'].includes(encounter.status),
              );

              return (
                <div key={patient.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 12, display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{patient.nome}</div>
                    <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                      {calculateAge(patient.dataNascimento)} anos · {patient.dataNascimento}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#475569' }}>{patient.telefone}</div>
                  </div>
                  <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
                    {activeEncounter ? <RiskBadge risk="azul" label="Ativo" /> : <RiskBadge risk="verde" label="Disponível" />}
                    <button type="button" onClick={() => openEncounter(patient.id)} disabled={activeEncounter} style={{ padding: '0.5rem 0.8rem', borderRadius: 10, border: 'none', background: activeEncounter ? '#d1d5db' : '#111827', color: '#fff' }}>
                      {activeEncounter ? 'Atendimento ativo' : 'Abrir atendimento'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ background: '#fff', borderRadius: 16, padding: 18, border: '1px solid #e5e7eb' }}>
          <h3>Cadastrar novo paciente</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
            <input value={form.nome} onChange={(event) => setForm({ ...form, nome: event.target.value })} placeholder="Nome" />
            <input type="date" value={form.dataNascimento} onChange={(event) => setForm({ ...form, dataNascimento: event.target.value })} />
            <select value={form.sexo} onChange={(event) => setForm({ ...form, sexo: event.target.value })}>
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
              <option value="Outro">Outro</option>
            </select>
            <input value={form.telefone} onChange={(event) => setForm({ ...form, telefone: event.target.value })} placeholder="Telefone" />
            <input value={form.alergias} onChange={(event) => setForm({ ...form, alergias: event.target.value })} placeholder="Alergias conhecidas" />
            <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem' }}>
              Cadastrar paciente
            </button>
          </form>
        </section>
      </div>

      <section style={{ background: '#fff', borderRadius: 16, padding: 18, border: '1px solid #e5e7eb' }}>
        <h3>Atendimentos abertos</h3>
        <div style={{ display: 'grid', gap: 10 }}>
          {encounters.map((encounter) => (
            <div key={encounter.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: 12, padding: 12 }}>
              <div>
                <strong>{encounter.code}</strong> · {encounter.patient?.nome ?? 'Paciente'}
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <RiskBadge risk={encounter.riskColor ?? 'azul'} />
                <span style={{ fontSize: '0.8rem', color: '#475569' }}>{encounter.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
