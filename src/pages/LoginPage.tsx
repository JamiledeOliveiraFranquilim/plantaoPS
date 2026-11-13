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
    <main className="login-shell">
      <div className="watermark">wordly</div>
      <div className="brand-text">YUDAEV.SCHOOL</div>

      <div className="scene-layout">
        <section className="panel big-panel">
          <div className="panel-topline">
            <div>
              <span className="eyebrow">HELLO, HELLEN.</span>
              <small>every day is a new opportunity</small>
            </div>
            <div className="user-pill">
              <span>Hellen Wallace</span>
              <div className="mini-avatar" aria-hidden="true" />
            </div>
          </div>

          <div className="panel-main-grid">
            <div className="calendar-box">
              <div className="mini-nav">
                <span className="nav-icon">◔</span>
                <span className="nav-label">JANUARY 2022</span>
                <span className="nav-icon">◌</span>
              </div>

              <div className="calendar-grid">
                <span>sun</span>
                <span>mon</span>
                <span>tue</span>
                <span>wed</span>
                <span>thu</span>
                <span>fri</span>
                <span>sat</span>

                {Array.from({ length: 35 }, (_, index) => {
                  const values = [
                    '', '', '', '1', '2', '3', '4', '5',
                    '6', '7', '8', '9', '10', '11', '12',
                    '13', '14', '15', '16', '17', '18', '19',
                    '20', '21', '22', '23', '24', '25', '26',
                    '27', '28', '29', '30', '31'
                  ]
                  const value = values[index] ?? ''
                  const active = value === '13' || value === '14' || value === '29'

                  return (
                    <div key={index} className={active ? 'day active' : 'day'}>
                      {value}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="events-box">
              <div className="mini-nav">
                <span className="nav-label">EVENTS</span>
                <span className="nav-icon">⋯</span>
              </div>

              <div className="event-card">
                <div className="event-time">2:00 p.m. - 4:00 p.m.</div>
                <div className="event-date">Mon, 24 January 2022</div>
              </div>

              <div className="event-card">
                <div className="event-time">17 Elm Street, Suite 30</div>
                <div className="event-date">Location</div>
              </div>

              <div className="event-list">
                <span className="dot blue" />
                today&apos;s product design class
                <span className="dot orange" />
                programming class
              </div>
            </div>
          </div>
        </section>

        <section className="panel phone-panel">
          <div className="mini-nav compact-nav">
            <div className="mini-avatar small-avatar" aria-hidden="true" />
            <span>student</span>
          </div>

          <div className="calendar-box small-calendar">
            <div className="calendar-header">January, 2022</div>
            <div className="calendar-grid mini-grid">
              <span>sun</span>
              <span>mon</span>
              <span>tue</span>
              <span>wed</span>
              <span>thu</span>
              <span>fri</span>
              <span>sat</span>
              {Array.from({ length: 35 }, (_, index) => {
                const values = [
                  '', '', '', '', '', '1', '2',
                  '3', '4', '5', '6', '7', '8', '9',
                  '10', '11', '12', '13', '14', '15', '16',
                  '17', '18', '19', '20', '21', '22', '23',
                  '24', '25', '26', '27', '28', '29', '30', '31'
                ]
                const value = values[index] ?? ''
                const active = value === '13' || value === '14' || value === '29'
                return (
                  <div key={index} className={active ? 'day active' : 'day'}>
                    {value}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="events-box small-events">
            <div className="mini-nav">
              <span className="nav-label">EVENTS</span>
            </div>
            <div className="event-card mini-event">
              <div className="event-time">2:00 p.m. - 4:00 p.m.</div>
              <div className="event-date">Mon, 24 January 2022</div>
            </div>
            <div className="event-card mini-event">
              <div className="event-time">17 Elm Street, Suite 30</div>
              <div className="event-date">Location</div>
            </div>
          </div>
        </section>

        <section className="panel course-panel">
          <div className="course-header">
            <div className="course-title">COURSE ACTIVITY</div>
            <button type="button" className="add-button">+</button>
          </div>

          <div className="course-body">
            <div className="course-list">
              <div className="course-card dark-card">
                <div className="course-badge">VOCAB VAULT</div>
                <div className="course-score">10</div>
                <div className="course-text">unlock the power of words and boost your vocabulary.</div>
              </div>

              <div className="course-card light-card">
                <div className="course-badge">GRAMMAR HACK</div>
                <div className="course-score small-score">3</div>
                <div className="course-text">better use of grammar rules.</div>
              </div>

              <div className="course-card dark-card small-dark">
                <div className="course-badge">SOUND SENSE</div>
                <div className="course-score">21</div>
                <div className="course-text">hear it, feel it, say it right.</div>
              </div>
            </div>

            <div className="learning-panel">
              <div className="learning-header">MY LEARNING</div>

              <div className="learning-item">
                <span className="learning-icon">◍</span>
                <span>Lexical mastery</span>
                <strong>30%</strong>
              </div>

              <div className="learning-item">
                <span className="learning-icon">◍</span>
                <span>Pronunciation lab</span>
                <strong>85%</strong>
              </div>

              <div className="learning-item">
                <span className="learning-icon">◍</span>
                <span>Core grammar</span>
                <strong>10%</strong>
              </div>

              <div className="learning-item">
                <span className="learning-icon">◍</span>
                <span>Conversational skills</span>
                <strong>45%</strong>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="auth-panel">
        <h2>Entrar</h2>
        <p>Escolha um perfil de acesso.</p>

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

          <div className="demo-links">
            <button type="button" onClick={() => setEmail('recepcao@plantaops.local')}>Recepção</button>
            <button type="button" onClick={() => setEmail('enfermagem@plantaops.local')}>Enfermagem</button>
            <button type="button" onClick={() => setEmail('medico@plantaops.local')}>Médico</button>
            <button type="button" onClick={() => setEmail('gestao@plantaops.local')}>Gestão</button>
            <button type="button" onClick={() => setEmail('painel@plantaops.local')}>Painel</button>
          </div>
        </form>
      </div>
    </main>
  )
}
