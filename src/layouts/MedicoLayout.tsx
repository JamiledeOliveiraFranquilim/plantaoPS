type MedicoLayoutProps = {
  children?: React.ReactNode
}

export function MedicoLayout({ children }: MedicoLayoutProps) {
  return <div style={{ padding: 20 }}>{children ?? <h2>Médico</h2>}</div>
}
