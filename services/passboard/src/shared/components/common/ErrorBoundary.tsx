import { Component, type ReactNode, type ErrorInfo } from 'react'

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)

    this.state = { hasError: false }
  }
  static getDerivedStateFromError(/* error: Error*/) {
    return { hasError: true }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo })
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
