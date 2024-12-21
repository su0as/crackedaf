import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-lg p-6 max-w-md w-full">
            <h1 className="text-xl font-silkscreen text-amber-400 mb-4">
              SOMETHING WENT WRONG
            </h1>
            <p className="text-zinc-300 mb-4">
              We're having trouble loading the application. This might be due to:
            </p>
            <ul className="list-disc list-inside text-zinc-400 mb-4 space-y-2">
              <li>Missing or invalid configuration</li>
              <li>Network connectivity issues</li>
              <li>Temporary service disruption</li>
            </ul>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-amber-400 text-black py-2 px-4 rounded-md hover:bg-amber-300 transition-colors font-silkscreen"
            >
              RETRY
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}