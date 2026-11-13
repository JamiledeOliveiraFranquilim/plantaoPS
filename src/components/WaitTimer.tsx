type WaitTimerProps = {
  minutes: number
}

export function WaitTimer({ minutes }: WaitTimerProps) {
  return <span>{minutes} min</span>
}
