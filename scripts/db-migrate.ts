#!/usr/bin/env tsx
/**
 * Git Academy Vietnam — Managed PostgreSQL Database Migration CLI (Sprint 8)
 * Connects to Supabase / Render / Railway PostgreSQL via DATABASE_URL and executes schema migrations.
 * Usage: pnpm db:migrate
 *        DATABASE_URL=postgresql://... pnpm db:migrate
 */

import fs from 'node:fs';
import path from 'node:path';
import { Client } from 'pg';

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;

  console.log('====================================================================');
  console.log('🐘 GIT ACADEMY VIETNAM — MANAGED POSTGRESQL MIGRATION');
  console.log('====================================================================\n');

  if (!databaseUrl) {
    console.error('❌ Lỗi: Biến môi trường DATABASE_URL chưa được thiết lập.');
    console.error('   Vui lòng cung cấp connection string của Supabase, Render, hoặc Railway:');
    console.error('   Ví dụ:');
    console.error('     DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxx.supabase.co:5432/postgres pnpm db:migrate\n');
    console.error('   Hoặc lưu trong tệp .env ở thư mục gốc dự án.');
    process.exit(1);
  }

  // Hide password in logged connection string
  const maskedUrl = databaseUrl.replace(/:([^:@]+)@/, ':****@');
  console.log(`📡 Đang kết nối tới: ${maskedUrl}`);

  const migrationFile = path.resolve(process.cwd(), 'migrations/001_initial_lms_schema.sql');
  if (!fs.existsSync(migrationFile)) {
    console.error(`❌ Không tìm thấy tệp migration: ${migrationFile}`);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(migrationFile, 'utf8');
  const isLocalhost = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');

  const client = new Client({
    connectionString: databaseUrl,
    ssl: isLocalhost ? false : { rejectUnauthorized: false },
  });

  const startTime = Date.now();

  try {
    await client.connect();
    console.log('✅ Đã kết nối cơ sở dữ liệu thành công!');
    console.log('🚀 Đang thực thi schema migration (migrations/001_initial_lms_schema.sql)...');

    await client.query(sqlContent);

    // Verify created tables
    const tableRes = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    const tableNames = tableRes.rows.map((r: any) => r.table_name);
    const durationMs = Date.now() - startTime;

    console.log(`\n🎉 Migration hoàn tất trong ${durationMs}ms!`);
    console.log(`📊 Đã xác thực ${tableNames.length} bảng trong schema public:`);
    tableNames.forEach((t: string) => console.log(`   ✓ ${t}`));

    // Verify index count
    const indexRes = await client.query(`
      SELECT count(*) AS total_indexes
      FROM pg_indexes
      WHERE schemaname = 'public';
    `);
    console.log(`   ✓ Đã kích hoạt ${indexRes.rows[0].total_indexes} indexes tối ưu hiệu năng.`);

  } catch (err: any) {
    console.error(`\n❌ Migration thất bại: ${err.message}`);
    if (err.position) {
      console.error(`   Vị trí SQL error: character ${err.position}`);
    }
    process.exit(1);
  } finally {
    await client.end().catch(() => {});
  }
}

runMigration();
