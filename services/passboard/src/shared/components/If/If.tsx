export type IfProps = {
  condition: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function If({ condition, children, fallback = null }: IfProps) {
  return condition ? children : fallback
}
