export function CadastroPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', padding: 32 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <p style={{ margin: 0, color: '#2563eb', fontWeight: 700 }}>PlantãoPS</p>
            <h1 style={{ margin: '8px 0 0' }}>Cadastro de paciente</h1>
          </div>
          <a href="/login" style={{ color: '#1f2937', textDecoration: 'none', fontWeight: 600 }}>
            Voltar ao login
          </a>
        </div>

        <form
          style={{
            background: '#fff',
            borderRadius: 20,
            padding: 24,
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            <label>
              <span style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Nome completo</span>
              <input type="text" defaultValue="Maria da Silva" style={inputStyle} />
            </label>

            <label>
              <span style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Data de nascimento</span>
              <input type="date" defaultValue="1990-05-14" style={inputStyle} />
            </label>

            <label>
              <span style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Sexo</span>
              <select defaultValue="Feminino" style={inputStyle}>
                <option>Feminino</option>
                <option>Masculino</option>
                <option>Outro</option>
              </select>
            </label>

            <label>
              <span style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Telefone</span>
              <input type="tel" defaultValue="(11) 99999-1234" style={inputStyle} />
            </label>
          </div>

          <div style={{ marginTop: 20 }}>
            <label>
              <span style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Alergias conhecidas</span>
              <textarea
                rows={4}
                defaultValue="Penicilina, dipirona"
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </label>
          </div>

          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" style={secondaryButton}>Cancelar</button>
            <button type="submit" style={primaryButton}>Salvar paciente</button>
          </div>
        </form>
      </div>
    </main>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #dbe3ee',
  background: '#f8fafc',
  fontSize: 15,
  boxSizing: 'border-box',
}

const primaryButton: React.CSSProperties = {
  border: 'none',
  borderRadius: 10,
  background: '#2563eb',
  color: '#fff',
  fontWeight: 700,
  padding: '12px 18px',
  cursor: 'pointer',
}

const secondaryButton: React.CSSProperties = {
  border: '1px solid #dbe3ee',
  background: '#fff',
  color: '#1f2937',
  borderRadius: 10,
  fontWeight: 600,
  padding: '12px 18px',
  cursor: 'pointer',
}
