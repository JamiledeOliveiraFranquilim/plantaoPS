type GestaoLayoutProps = {
  children?: React.ReactNode
}

export function GestaoLayout({ children }: GestaoLayoutProps) {
  return <div style={{ padding: 20 }}>{children ?? <h2>Gestão</h2>}</div>
}
