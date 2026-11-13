export function SupabasePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0f172a', color: '#e2e8f0', padding: 32 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ margin: 0, color: '#7dd3fc', fontWeight: 700 }}>Supabase</p>
            <h1 style={{ margin: '8px 0 0' }}>Configuração e links úteis</h1>
          </div>

          <a href="/login" style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: 700 }}>
            Voltar ao login
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 28 }}>
          <LinkCard
            title="Projeto no Supabase"
            text="Acesse o painel do banco, autenticação e storage."
            href="https://supabase.com/dashboard"
            label="Abrir dashboard"
          />

          <LinkCard
            title="Documentação"
            text="Auth, Realtime, Row Level Security e SQL do banco."
            href="https://supabase.com/docs"
            label="Ver documentação"
          />

          <LinkCard
            title="SQL Editor"
            text="Crie tabelas, policies, funções e triggers."
            href="https://supabase.com/dashboard/project/_/sql"
            label="Abrir SQL Editor"
          />

          <LinkCard
            title="Auth"
            text="Gerencie usuários, perfis e login por e-mail e senha."
            href="https://supabase.com/dashboard/project/_/auth/users"
            label="Abrir Auth"
          />
        </div>

        <section
          style={{
            marginTop: 32,
            background: '#111827',
            border: '1px solid #334155',
            borderRadius: 18,
            padding: 24,
          }}
        >
          <h2 style={{ marginTop: 0 }}>Checklist do projeto</h2>
          <ul style={{ lineHeight: 1.8, color: '#cbd5e1' }}>
            <li>Configurar variáveis de ambiente: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY</li>
            <li>Criar tabelas: profiles, patients, triages, encounters, beds e calls</li>
            <li>Ativar RLS e policies por perfil</li>
            <li>Configurar funções RPC para chamar próximo paciente e alocar leito</li>
            <li>Habilitar Realtime para fila, leitos e painel de chamadas</li>
          </ul>
        </section>
      </div>
    </main>
  )
}

type LinkCardProps = {
  title: string
  text: string
  href: string
  label: string
}

function LinkCard({ title, text, href, label }: LinkCardProps) {
  return (
    <article
      style={{
        background: '#111827',
        border: '1px solid #334155',
        borderRadius: 16,
        padding: 20,
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ color: '#cbd5e1', marginBottom: 18 }}>{text}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-block',
          background: '#2563eb',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 700,
          padding: '10px 14px',
          borderRadius: 10,
        }}
      >
        {label}
      </a>
    </article>
  )
}
