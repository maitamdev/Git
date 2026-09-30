import React from 'react';

export interface CommandTokenExplanation {
  token: string;
  explanation: string;
}

export function explainCommand(commandLine: string): CommandTokenExplanation[] {
  const regex = /[^\s"']+|"[^"]*"|'[^']*'/g;
  const parts: string[] = [];
  let match;
  while ((match = regex.exec(commandLine.trim())) !== null) {
    parts.push(match[0]);
  }
  const result: CommandTokenExplanation[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === 0 && part === 'git') {
      result.push({ token: 'git', explanation: 'Gọi chương trình quản lý phiên bản Git' });
    } else if (part === 'add') {
      result.push({ token: 'add', explanation: 'Đưa các thay đổi của file vào Staging Area (chuẩn bị commit)' });
    } else if (part === '.') {
      result.push({ token: '.', explanation: 'Áp dụng cho toàn bộ các file và thư mục con trong thư mục hiện tại' });
    } else if (part === 'commit') {
      result.push({ token: 'commit', explanation: 'Lưu vĩnh viễn ảnh chụp (snapshot) của Staging Area vào lịch sử' });
    } else if (part === '-m' || part === '--message') {
      result.push({ token: part, explanation: 'Chỉ định thông điệp mô tả nội dung commit trực tiếp' });
    } else if (part === 'status') {
      result.push({ token: 'status', explanation: 'Kiểm tra trạng thái của Working Tree và Staging Area' });
    } else if (part === 'branch') {
      result.push({ token: 'branch', explanation: 'Liệt kê, tạo mới hoặc quản lý các nhánh làm việc' });
    } else if (part === 'switch') {
      result.push({ token: 'switch', explanation: 'Chuyển đổi không gian làm việc sang nhánh chỉ định' });
    } else if (part === 'checkout') {
      result.push({ token: 'checkout', explanation: 'Chuyển nhánh hoặc hoàn tác các tệp tin trong working tree' });
    } else if (part === '-b' || part === '-c') {
      result.push({ token: part, explanation: 'Tạo mới một nhánh và lập tức chuyển sang nhánh đó' });
    } else if (part === 'merge') {
      result.push({ token: 'merge', explanation: 'Hợp nhất lịch sử của nhánh chỉ định vào nhánh hiện tại' });
    } else if (part === 'remote') {
      result.push({ token: 'remote', explanation: 'Quản lý các kết nối tới kho lưu trữ từ xa (remote)' });
    } else if (part === 'clone') {
      result.push({ token: 'clone', explanation: 'Sao chép toàn bộ kho chứa từ xa về máy cục bộ' });
    } else if (part === 'fetch') {
      result.push({ token: 'fetch', explanation: 'Tải về lịch sử commit mới nhất từ remote nhưng chưa gộp vào working tree' });
    } else if (part === 'pull') {
      result.push({ token: 'pull', explanation: 'Tải về và tự động gộp (fetch + merge) thay đổi từ remote vào nhánh hiện tại' });
    } else if (part === 'push') {
      result.push({ token: 'push', explanation: 'Đẩy các commit từ nhánh cục bộ lên kho chứa từ xa' });
    } else if (part === '-u' || part === '--set-upstream') {
      result.push({ token: part, explanation: 'Thiết lập liên kết theo dõi (upstream tracking) giữa nhánh cục bộ và nhánh remote' });
    } else if (part === 'origin') {
      result.push({ token: 'origin', explanation: 'Tên mặc định đại diện cho máy chủ kho chứa từ xa chính' });
    } else if (part === 'main' || part === 'master') {
      result.push({ token: part, explanation: 'Nhánh mặc định chính của dự án' });
    } else if (part.startsWith('"') || part.startsWith("'")) {
      result.push({ token: part, explanation: `Nội dung tham số chuỗi: ${part.replace(/^["']|["']$/g, '')}` });
    } else {
      result.push({ token: part, explanation: `Tham số / đối số: ${part}` });
    }
  }

  return result;
}

export const CommandExplainer: React.FC<{ commandLine: string }> = ({ commandLine }) => {
  if (!commandLine.trim()) return null;
  const tokens = explainCommand(commandLine);

  return (
    <div
      className="command-explainer-box"
      style={{
        padding: '10px 14px',
        borderRadius: '6px',
        background: '#090e1c',
        border: '1px solid #1e293b',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8rem',
        marginTop: '8px',
      }}
    >
      <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: '6px', fontSize: '0.75rem' }}>
        🔍 GIẢI THÍCH CÂU LỆNH:
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {tokens.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <code
              style={{
                fontFamily: 'var(--font-mono)',
                color: '#34d399',
                background: '#020617',
                padding: '1px 6px',
                borderRadius: '3px',
                minWidth: '60px',
                textAlign: 'center',
              }}
            >
              {item.token}
            </code>
            <span style={{ color: '#64748b' }}>→</span>
            <span style={{ color: '#cbd5e1' }}>{item.explanation}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
