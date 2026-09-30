#!/usr/bin/env tsx
/**
 * Git Academy Vietnam — Production Environment Verification Utility (Sprint 8)
 * Checks that all necessary cloud environment variables are present and secure before deployment.
 * Usage: pnpm verify:production-env
 */

interface EnvCheck {
  name: string;
  scope: 'API' | 'Frontend' | 'Both';
  required: boolean;
  validate: (val?: string) => { valid: boolean; message: string; severity: 'error' | 'warn' | 'ok' };
}

const CHECKS: EnvCheck[] = [
  {
    name: 'DATABASE_URL',
    scope: 'API',
    required: true,
    validate: (val) => {
      if (!val) return { valid: false, message: 'Chưa thiết lập biến DATABASE_URL', severity: 'error' };
      if (!/^postgres(ql)?:\/\//i.test(val)) return { valid: false, message: 'Định dạng URL không hợp lệ (phải bắt đầu bằng postgresql://)', severity: 'error' };
      if (val.includes('change_this_to_strong_secret') || val.includes('postgres:password')) {
        return { valid: false, message: 'Đang dùng mật khẩu mẫu trong connection string!', severity: 'error' };
      }
      return { valid: true, message: 'Hợp lệ (Managed PostgreSQL connection string)', severity: 'ok' };
    },
  },
  {
    name: 'AUTH_SECRET',
    scope: 'API',
    required: true,
    validate: (val) => {
      if (!val) return { valid: false, message: 'Chưa thiết lập biến AUTH_SECRET', severity: 'error' };
      if (val.length < 32) return { valid: false, message: `Khóa quá ngắn (${val.length}/32 ký tự tối thiểu)`, severity: 'error' };
      if (val.includes('generate_with_openssl') || val.includes('secret') || val.includes('123456')) {
        return { valid: false, message: 'Đang dùng secret mẫu! Vui lòng sinh bằng: openssl rand -hex 32', severity: 'error' };
      }
      return { valid: true, message: `Hợp lệ (${val.length} ký tự mật mã)`, severity: 'ok' };
    },
  },
  {
    name: 'NODE_ENV',
    scope: 'Both',
    required: false,
    validate: (val) => {
      if (val === 'production') return { valid: true, message: 'Đã kích hoạt chế độ production', severity: 'ok' };
      return { valid: true, message: `Hiện tại là '${val || 'development'}'. Cần đặt NODE_ENV=production trên Render/Vercel`, severity: 'warn' };
    },
  },
  {
    name: 'CORS_ORIGIN',
    scope: 'API',
    required: true,
    validate: (val) => {
      if (!val) return { valid: false, message: 'Chưa cấu hình CORS_ORIGIN (Cần trỏ tới Vercel URL của frontend)', severity: 'error' };
      if (val.includes('localhost') && process.env.NODE_ENV === 'production') {
        return { valid: false, message: 'CORS_ORIGIN không được chứa localhost ở môi trường production!', severity: 'error' };
      }
      return { valid: true, message: `Hợp lệ (${val})`, severity: 'ok' };
    },
  },
  {
    name: 'VITE_API_URL',
    scope: 'Frontend',
    required: false,
    validate: (val) => {
      if (!val) return { valid: true, message: 'Chưa có trên local; Trên Vercel cần đặt VITE_API_URL trỏ tới Render/Railway API', severity: 'warn' };
      if (val.includes('localhost') && process.env.NODE_ENV === 'production') {
        return { valid: false, message: 'VITE_API_URL không được chứa localhost khi build production trên Vercel!', severity: 'error' };
      }
      return { valid: true, message: `Hợp lệ (${val})`, severity: 'ok' };
    },
  },
];

function main() {
  console.log('====================================================================');
  console.log('🛡️  GIT ACADEMY VIETNAM — PRODUCTION ENVIRONMENT AUDIT');
  console.log('====================================================================\n');

  let hasError = false;
  let warnCount = 0;

  console.log('Biến môi trường | Phạm vi    | Trạng thái | Chi tiết');
  console.log('----------------|------------|------------|-----------------------------------------');

  for (const check of CHECKS) {
    const rawVal = process.env[check.name];
    const res = check.validate(rawVal);

    let statusLabel = '✅ PASS';
    if (res.severity === 'error') {
      statusLabel = '❌ FAIL';
      hasError = true;
    } else if (res.severity === 'warn') {
      statusLabel = '⚠️  WARN';
      warnCount++;
    }

    console.log(
      `${check.name.padEnd(15, ' ')} | ${check.scope.padEnd(10, ' ')} | ${statusLabel.padEnd(10, ' ')} | ${res.message}`
    );
  }

  console.log('\n====================================================================');
  if (hasError) {
    console.error('❌ KIỂM TRA THẤT BẠI: Phát hiện biến môi trường thiếu hoặc không an toàn.');
    console.error('   Vui lòng cấu hình các biến trên dashboard Vercel / Render / Supabase.');
    process.exit(1);
  } else {
    console.log(`✅ Toàn bộ biến môi trường kiểm tra đạt chuẩn! (Cảnh báo lưu ý: ${warnCount})`);
  }
}

if (process.argv[1]?.endsWith('verify-production-env.ts') || process.argv[1]?.endsWith('verify-production-env.js')) {
  main();
}
