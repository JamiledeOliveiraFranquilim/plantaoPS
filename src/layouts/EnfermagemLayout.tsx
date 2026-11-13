type EnfermagemLayoutProps = {
  children?: React.ReactNode
}

export function EnfermagemLayout({ children }: EnfermagemLayoutProps) {
  return <div style={{ padding: 20 }}>{children ?? <h2>Enfermagem</h2>}</div>
}
