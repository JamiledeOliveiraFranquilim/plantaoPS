type RecepcaoLayoutProps = {
  children?: React.ReactNode
}

export function RecepcaoLayout({ children }: RecepcaoLayoutProps) {
  return <div style={{ padding: 20 }}>{children ?? <h2>Recepção</h2>}</div>
}
