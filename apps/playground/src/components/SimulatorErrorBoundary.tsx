import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onResetEngine?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
}

export class SimulatorErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, showDetails: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[SimulatorErrorBoundary] Simulator engine caught fatal state error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, showDetails: false });
    if (this.props.onResetEngine) {
      this.props.onResetEngine();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '24px',
            background: 'var(--bg-secondary, #0f172a)',
            color: 'var(--text-primary, #f8fafc)',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🛡️</div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#f87171' }}>
            {this.props.fallbackTitle || 'Không thể mô phỏng trạng thái Git'}
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#94a3b8', maxWidth: '420px', lineHeight: '1.5' }}>
            Mô phỏng đồ thị hoặc hệ thống tệp gặp xung đột trạng thái bất ngờ. Dữ liệu tiến độ học của bạn vẫn an toàn.
          </p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Khởi động lại Lab
            </button>
            <button
              onClick={() => this.setState((prev) => ({ showDetails: !prev.showDetails }))}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid #334155',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {this.state.showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
            </button>
          </div>

          {this.state.showDetails && (
            <pre
              style={{
                textAlign: 'left',
                background: '#020617',
                padding: '12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                color: '#ef4444',
                maxWidth: '90%',
                maxHeight: '120px',
                overflow: 'auto',
                border: '1px solid #1e293b',
              }}
            >
              {this.state.error?.stack || this.state.error?.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
