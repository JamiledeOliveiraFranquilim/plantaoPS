import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const demoProfiles = [
  { label: 'Recepção', email: 'recepcao@plantaops.local' },
  { label: 'Enfermagem', email: 'enfermagem@plantaops.local' },
  { label: 'Médico', email: 'medico@plantaops.local' },
  { label: 'Gestão', email: 'gestao@plantaops.local' },
  { label: 'Painel', email: 'painel@plantaops.local' },
]

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
    <main className="login-shell">
      <div className="login-glow" />

      <div className="login-layout">
        <section className="login-hero">
          <div className="brand-row">
            <div className="brand-mark">P</div>
            <span className="brand-name">PlantaOps</span>
          </div>

          <p className="hero-kicker">Sistema de plantão hospitalar</p>
          <h1>Operação clínica em tempo real.</h1>
          <p className="hero-text">
            Centralize recepção, triagem, fila médica, gestão e painel de chamadas em uma
            plataforma moderna e segura.
          </p>

          <div className="hero-stats">
            <div className="mini-stat">
              <strong>24/7</strong>
              <span>monitoramento</span>
            </div>
            <div className="mini-stat">
              <strong>5</strong>
              <span>perfis ativos</span>
            </div>
            <div className="mini-stat">
              <strong>100%</strong>
              <span>pronto para operação</span>
            </div>
          </div>

          <div className="hero-cards">
            <div className="info-card">
              <span>Atendimentos em fila</span>
              <strong>18</strong>
            </div>
            <div className="info-card accent">
              <span>Tempo médio</span>
              <strong>12 min</strong>
            </div>
          </div>
        </section>

        <section className="auth-panel">
          <div className="auth-header">
            <p>Bem-vindo</p>
            <h2>Acessar sistema</h2>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label>
              <span>E-mail</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>

            <label>
              <span>Senha</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>

            {error ? <div className="login-error">{error}</div> : null}

            <button type="submit" className="login-button">Entrar</button>
          </form>

          <div className="demo-links">
            {demoProfiles.map((profile) => (
              <button
                key={profile.email}
                type="button"
                className="profile-button"
                onClick={() => setEmail(profile.email)}
              >
                {profile.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
