import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('recepcao@plantaops.local')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const result = await login(email, password)

    if (result.error) {
      setError(result.error)
      return
    }

    const role = result.profile?.role ?? 'recepcao'
    const routes: Record<string, string> = {
      recepcao: '/recepcao',
      enfermagem: '/enfermagem',
      medico: '/medico',
      gestao: '/gestao',
      painel: '/painel',
    }

    navigate(routes[role] ?? '/recepcao')
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f3f4f6' }}>
      <div
        style={{
          width: 'min(420px, 90vw)',
          background: '#fff',
          padding: 24,
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        <h1 style={{ marginBottom: 12 }}>PlantãoPS</h1>
        <p style={{ marginBottom: 24, color: '#4b5563' }}>Acesse com seu perfil de trabalho.</p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 8 }}>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{
              width: '100%',
              padding: 10,
              marginBottom: 16,
              borderRadius: 8,
              border: '1px solid #d1d5db',
            }}
          />

          <label style={{ display: 'block', marginBottom: 8 }}>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{
              width: '100%',
              padding: 10,
              marginBottom: 16,
              borderRadius: 8,
              border: '1px solid #d1d5db',
            }}
          />

          {error ? (
            <div style={{ color: '#b91c1c', marginBottom: 12, fontWeight: 600 }}>{error}</div>
          ) : null}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              borderRadius: 8,
              background: '#2563eb',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Entrar
          </button>

          <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" onClick={() => setEmail('recepcao@plantaops.local')} className="demo-link" style={demoButton}>Recepção</button>
            <button type="button" onClick={() => setEmail('enfermagem@plantaops.local')} className="demo-link" style={demoButton}>Enfermagem</button>
            <button type="button" onClick={() => setEmail('medico@plantaops.local')} className="demo-link" style={demoButton}>Médico</button>
            <button type="button" onClick={() => setEmail('gestao@plantaops.local')} className="demo-link" style={demoButton}>Gestão</button>
            <button type="button" onClick={() => setEmail('painel@plantaops.local')} className="demo-link" style={demoButton}>Painel</button>
          </div>
        </form>
      </div>
    </main>
  )
}

const demoButton: React.CSSProperties = {
  background: '#eff6ff',
  color: '#1d4ed8',
  border: '1px solid #bfdbfe',
  borderRadius: 8,
  padding: '8px 10px',
  cursor: 'pointer',
  fontWeight: 600,
}
