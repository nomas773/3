import React, { StrictMode, Component, ReactNode, ErrorInfo } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RootErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fff8fa] text-[#2b141e] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-white border border-pink-200 shadow-2xl">
            <span className="font-calligraphy text-3xl font-bold text-pink-gradient block mb-3">
              Ahmed &amp; Sama
            </span>
            <p className="text-sm text-[#7a4e63] mb-6">
              Engagement Celebration • Friday, October 2, 2026
            </p>
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch {
                  // ignore
                }
                window.location.reload();
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-xl hover:brightness-105 active:scale-95 transition-all shadow-md shadow-pink-200 cursor-pointer"
            >
              Reload Invitation
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>
);
