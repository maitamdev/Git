#!/usr/bin/env tsx
import bcrypt from 'bcryptjs';

interface AdminBootstrapConfig {
  email: string;
  displayName: string;
  password: string;
}

export function parseArgs(argv: string[]): Partial<AdminBootstrapConfig> {
  const config: Partial<AdminBootstrapConfig> = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--email' && argv[i + 1]) {
      config.email = argv[++i];
    } else if (argv[i] === '--password' && argv[i + 1]) {
      config.password = argv[++i];
    } else if (argv[i] === '--name' && argv[i + 1]) {
      config.displayName = argv[++i];
    }
  }
  return config;
}

export function validatePasswordStrength(password: string): { valid: boolean; error?: string } {
  if (!password || password.length < 8) {
    return { valid: false, error: 'Mật khẩu quản trị viên phải từ 8 ký tự trở lên' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Mật khẩu phải chứa ít nhất một chữ số' };
  }
  return { valid: true };
}

export function bootstrapAdmin(config: AdminBootstrapConfig) {
  const validation = validatePasswordStrength(config.password);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Cost factor 10 bcrypt hash
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(config.password, salt);
  const adminId = `admin-root-${Date.now()}`;
  const now = new Date().toISOString();

  const userRecord = {
    id: adminId,
    email: config.email.toLowerCase().trim(),
    displayName: config.displayName.trim(),
    role: 'admin',
    passwordHash,
    createdAt: now,
    updatedAt: now,
  };

  const sqlInsert = `
INSERT INTO users (id, email, display_name, role, password_hash, created_at, updated_at)
VALUES ('${userRecord.id}', '${userRecord.email}', '${userRecord.displayName.replace(/'/g, "''")}', 'admin', '${userRecord.passwordHash}', '${now}', '${now}')
ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = EXCLUDED.updated_at;
`.trim();

  return {
    user: userRecord,
    sql: sqlInsert,
  };
}

async function main() {
  const cliArgs = parseArgs(process.argv.slice(2));
  const email = cliArgs.email || process.env.BOOTSTRAP_ADMIN_EMAIL || 'admin@gitacademy.vn';
  const displayName = cliArgs.displayName || process.env.BOOTSTRAP_ADMIN_NAME || 'Quản trị viên Hệ thống';
  const password = cliArgs.password || process.env.BOOTSTRAP_ADMIN_PASSWORD;

  if (!password) {
    console.error('❌ Lỗi: Cần cung cấp mật khẩu quản trị qua cờ --password <mật_khẩu> hoặc biến môi trường BOOTSTRAP_ADMIN_PASSWORD');
    process.exit(1);
  }

  try {
    const result = bootstrapAdmin({ email, displayName, password });
    console.log('✅ Khởi tạo tài khoản quản trị viên Root thành công!');
    console.log(`   ID:           ${result.user.id}`);
    console.log(`   Email:        ${result.user.email}`);
    console.log(`   Tên hiển thị: ${result.user.displayName}`);
    console.log(`   Thuật toán:   bcrypt ($2a$10$)`);
    console.log(`   PasswordHash: ${result.user.passwordHash.substring(0, 15)}...`);

    const databaseUrl = process.env.DATABASE_URL;
    if (databaseUrl) {
      const isLocalhost = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');
      console.log('🔄 Đang kết nối Managed PostgreSQL để ghi tài khoản Admin...');
      const { Client } = await import('pg');
      const client = new Client({
        connectionString: databaseUrl,
        ssl: isLocalhost ? false : { rejectUnauthorized: false },
      });
      await client.connect();
      await client.query(result.sql);
      await client.end();
      console.log('🚀 Đã ghi trực tiếp tài khoản Admin vào Managed PostgreSQL thành công!');
    } else {
      console.log('\n--- SQL Insert Script ---');
      console.log(result.sql);
    }
  } catch (err: any) {
    console.error(`❌ Khởi tạo thất bại: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1]?.endsWith('bootstrap-admin.ts') || process.argv[1]?.endsWith('bootstrap-admin.js')) {
  main();
}
