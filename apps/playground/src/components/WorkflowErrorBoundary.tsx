import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onResetWorkflow?: () => void;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class WorkflowErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[WorkflowErrorBoundary] Caught Workflow simulation error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
    if (this.props.onResetWorkflow) {
      this.props.onResetWorkflow();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            padding: '20px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#f87171',
            margin: '16px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.25rem' }}>⚙️</span>
            <strong style={{ fontSize: '0.95rem' }}>Lỗi thực thi GitHub Actions Workflow Simulator</strong>
          </div>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#cbd5e1' }}>
            {this.state.errorMessage || 'Kịch bản YAML hoặc cấu hình runner gặp lỗi bất thường.'}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.8rem',
            }}
          >
            Khôi phục Workflow mặc định
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
