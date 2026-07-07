import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg px-4">
          <div className="text-center">
            <h2 className="font-syncopate text-neon text-2xl mb-4">Something went wrong</h2>
            <p className="text-steel text-sm mb-6">Please refresh the page to try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="font-space text-xs uppercase tracking-wider text-bg bg-neon rounded-full px-6 py-2.5 interactive"
            >
              Refresh
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
