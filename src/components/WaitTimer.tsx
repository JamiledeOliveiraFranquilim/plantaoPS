type WaitTimerProps = {
  minutes: number;
  timeoutMinutes?: number;
}

export function WaitTimer({ minutes, timeoutMinutes }: WaitTimerProps) {
  const exceeded = typeof timeoutMinutes === 'number' && timeoutMinutes > 0 && minutes > timeoutMinutes;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 999,
        padding: '0.25rem 0.6rem',
        background: exceeded ? '#fee2e2' : '#eff6ff',
        color: exceeded ? '#b91c1c' : '#1d4ed8',
        fontWeight: 700,
        fontSize: '0.76rem',
      }}
    >
      {minutes} min{exceeded ? ' • alerta' : ''}
    </span>
  );
}
