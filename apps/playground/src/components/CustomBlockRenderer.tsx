import React from 'react';

interface CustomBlockRendererProps {
  content: string;
  onRunCommand?: (cmd: string) => void;
  onSwitchTab?: (tab: 'theory' | 'lab' | 'quiz' | 'achievements') => void;
}

export const CustomBlockRenderer: React.FC<CustomBlockRendererProps> = ({
  content,
  onRunCommand,
  onSwitchTab,
}) => {
  // Parse blocks: detect :::type ... :::
  const parseBlocks = (raw: string) => {
    const lines = raw.split('\n');
    const elements: React.ReactNode[] = [];
    let currentMarkdown: string[] = [];
    let inBlock = false;
    let blockType = '';
    let blockParams = '';
    let blockContent: string[] = [];

    const flushMarkdown = () => {
      if (currentMarkdown.length > 0) {
        const text = currentMarkdown.join('\n').trim();
        if (text) {
          elements.push(
            <div key={`md-${elements.length}`} className="markdown-body-text">
              {renderSimpleMarkdown(text)}
            </div>
          );
        }
        currentMarkdown = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const directiveMatch = line.match(/^:::([a-z-]+)(?:\{(.*?)\})?$/i);

      if (!inBlock && directiveMatch) {
        flushMarkdown();
        inBlock = true;
        blockType = directiveMatch[1].toLowerCase();
        blockParams = directiveMatch[2] || '';
        blockContent = [];
      } else if (inBlock && line.trim() === ':::') {
        inBlock = false;
        elements.push(
          renderCustomDirective(
            blockType,
            blockParams,
            blockContent.join('\n'),
            elements.length,
            onRunCommand,
            onSwitchTab
          )
        );
        blockType = '';
        blockParams = '';
        blockContent = [];
      } else if (inBlock) {
        blockContent.push(line);
      } else {
        currentMarkdown.push(line);
      }
    }

    flushMarkdown();
    return elements;
  };

  const renderSimpleMarkdown = (text: string) => {
    const paragraphs = text.split(/\n\s*\n/);
    return paragraphs.map((para, idx) => {
      if (para.startsWith('# ')) {
        return (
          <h1 key={idx} style={{ fontSize: '1.4rem', color: '#f8fafc', margin: '0.8rem 0' }}>
            {para.replace('# ', '')}
          </h1>
        );
      }
      if (para.startsWith('## ')) {
        return (
          <h2 key={idx} style={{ fontSize: '1.15rem', color: '#38bdf8', margin: '0.7rem 0' }}>
            {para.replace('## ', '')}
          </h2>
        );
      }
      if (para.startsWith('### ')) {
        return (
          <h3 key={idx} style={{ fontSize: '1rem', color: '#93c5fd', margin: '0.5rem 0' }}>
            {para.replace('### ', '')}
          </h3>
        );
      }
      if (para.startsWith('```')) {
        const codeLines = para.split('\n');
        const codeText = codeLines.slice(1, -1).join('\n');
        return (
          <pre
            key={idx}
            style={{
              background: '#090d16',
              padding: '0.8rem',
              borderRadius: '6px',
              border: '1px solid #1e293b',
              overflowX: 'auto',
              fontSize: '0.82rem',
              color: '#38bdf8',
            }}
          >
            <code>{codeText}</code>
          </pre>
        );
      }

      // Regular paragraph with inline code and bold formatting
      return (
        <p key={idx} style={{ lineHeight: '1.6', margin: '0.5rem 0', color: '#cbd5e1' }}>
          {renderInlineMarkdown(para)}
        </p>
      );
    });
  };

  const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            style={{
              background: 'rgba(56, 189, 248, 0.12)',
              color: '#38bdf8',
              padding: '0.15rem 0.35rem',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85em',
            }}
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} style={{ color: '#f1f5f9' }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const renderCustomDirective = (
    type: string,
    params: string,
    body: string,
    key: number,
    runCmd?: (cmd: string) => void,
    switchTab?: (tab: 'theory' | 'lab' | 'quiz' | 'achievements') => void
  ) => {
    switch (type) {
      case 'definition':
        return (
          <div
            key={`block-${key}`}
            style={{
              background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.25) 0%, rgba(15, 23, 42, 0.6) 100%)',
              borderLeft: '4px solid #38bdf8',
              borderRadius: '0 8px 8px 0',
              padding: '0.9rem 1.1rem',
              margin: '1rem 0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.2rem' }}>📖</span>
              <strong style={{ color: '#38bdf8', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Định nghĩa cốt lõi
              </strong>
            </div>
            <div style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: '1.55' }}>
              {renderSimpleMarkdown(body)}
            </div>
          </div>
        );

      case 'example':
        return (
          <div
            key={`block-${key}`}
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              borderLeft: '4px solid #10b981',
              borderRadius: '0 8px 8px 0',
              padding: '0.9rem 1.1rem',
              margin: '1rem 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.2rem' }}>💡</span>
              <strong style={{ color: '#10b981', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Ví dụ thực tế
              </strong>
            </div>
            <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.55' }}>
              {renderSimpleMarkdown(body)}
            </div>
          </div>
        );

      case 'warning':
        return (
          <div
            key={`block-${key}`}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              borderLeft: '4px solid #ef4444',
              borderRadius: '0 8px 8px 0',
              padding: '0.9rem 1.1rem',
              margin: '1rem 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.2rem' }}>⚠️</span>
              <strong style={{ color: '#f87171', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Cảnh báo quan trọng
              </strong>
            </div>
            <div style={{ fontSize: '0.88rem', color: '#fca5a5', lineHeight: '1.55' }}>
              {renderSimpleMarkdown(body)}
            </div>
          </div>
        );

      case 'terminal':
        const commands = body
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l.length > 0 && !l.startsWith('#'));
        return (
          <div
            key={`block-${key}`}
            style={{
              background: '#090d16',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              margin: '1rem 0',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: '#0f172a',
                padding: '0.4rem 0.8rem',
                borderBottom: '1px solid #1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                  terminal-preview
                </span>
              </div>
            </div>
            <div style={{ padding: '0.8rem' }}>
              {commands.map((cmd, cIdx) => (
                <div
                  key={cIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.35rem 0',
                    borderBottom: cIdx < commands.length - 1 ? '1px dashed #1e293b' : 'none',
                  }}
                >
                  <code style={{ color: '#38bdf8', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                    $ {cmd}
                  </code>
                  {runCmd && (
                    <button
                      onClick={() => runCmd(cmd)}
                      style={{
                        background: 'rgba(56, 189, 248, 0.15)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        color: '#38bdf8',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      title="Chạy lệnh này trong Terminal bên dưới"
                    >
                      ▶ Chạy thử
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'git-graph':
        return (
          <div
            key={`block-${key}`}
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              padding: '0.8rem 1rem',
              margin: '1rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                <span>🌿</span>
                <strong style={{ color: '#38bdf8', fontSize: '0.88rem' }}>Sơ đồ Git Graph tương tác</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8' }}>
                Quan sát các nhánh và nút commit được cập nhật trực quan thời gian thực ở khung bên phải.
              </p>
            </div>
          </div>
        );

      case 'lab':
        return (
          <div
            key={`block-${key}`}
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '8px',
              padding: '1rem',
              margin: '1.2rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🧪</span>
                <strong style={{ color: '#10b981', fontSize: '0.95rem' }}>Bài tập thực hành (Lab)</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1' }}>
                Chuyển sang tab Thực hành để làm theo các mục tiêu và nhận điểm XP!
              </p>
            </div>
            {switchTab && (
              <button
                onClick={() => switchTab('lab')}
                style={{
                  background: '#10b981',
                  color: '#022c22',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Vào làm Lab ➔
              </button>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div
            key={`block-${key}`}
            style={{
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              borderRadius: '8px',
              padding: '1rem',
              margin: '1.2rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '1.2rem' }}>📝</span>
                <strong style={{ color: '#facc15', fontSize: '0.95rem' }}>Trắc nghiệm ôn tập</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1' }}>
                Trả lời các câu hỏi để kiểm tra mức độ nắm bắt kiến thức và mở khóa bài tiếp theo.
              </p>
            </div>
            {switchTab && (
              <button
                onClick={() => switchTab('quiz')}
                style={{
                  background: '#facc15',
                  color: '#422006',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Làm Trắc nghiệm ➔
              </button>
            )}
          </div>
        );

      default:
        return (
          <div key={`block-${key}`} style={{ padding: '0.5rem 0' }}>
            {renderSimpleMarkdown(body)}
          </div>
        );
    }
  };

  return <div className="custom-markdown-container">{parseBlocks(content)}</div>;
};
