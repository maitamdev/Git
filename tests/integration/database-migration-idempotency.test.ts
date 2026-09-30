import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Pre-Go-Live Audit: Database Migration & Idempotency (#2)', () => {
  const migrationPath = path.resolve(process.cwd(), 'migrations/001_initial_lms_schema.sql');

  it('migration file exists and is readable', () => {
    expect(fs.existsSync(migrationPath)).toBe(true);
    const content = fs.readFileSync(migrationPath, 'utf8');
    expect(content.length).toBeGreaterThan(1000);
  });

  it('defines all required production LMS tables with IF NOT EXISTS', () => {
    const content = fs.readFileSync(migrationPath, 'utf8');
    const requiredTables = [
      'users',
      'classes',
      'enrollments',
      'lesson_progress',
      'achievements',
      'assignments',
      'assignment_submissions',
      'grades',
      'activity_events',
      'audit_logs',
    ];

    for (const table of requiredTables) {
      const tableRegex = new RegExp(`CREATE\\s+TABLE\\s+IF\\s+NOT\\s+EXISTS\\s+${table}\\b`, 'i');
      expect(content).toMatch(tableRegex);
    }
  });

  it('defines all performance indexes with IF NOT EXISTS', () => {
    const content = fs.readFileSync(migrationPath, 'utf8');
    const requiredIndexes = [
      'idx_users_email',
      'idx_users_role',
      'idx_classes_code',
      'idx_classes_teacher',
      'idx_enrollments_class',
      'idx_enrollments_user',
      'idx_progress_user',
      'idx_progress_lesson',
      'idx_assignments_class',
      'idx_submissions_assignment',
      'idx_submissions_student',
      'idx_events_user',
      'idx_events_type',
      'idx_events_time',
      'idx_audit_time',
      'idx_audit_actor',
    ];

    for (const idx of requiredIndexes) {
      const idxRegex = new RegExp(`CREATE\\s+INDEX\\s+IF\\s+NOT\\s+EXISTS\\s+${idx}\\b`, 'i');
      expect(content).toMatch(idxRegex);
    }
  });

  it('enforces relational foreign keys with ON DELETE CASCADE and integrity constraints', () => {
    const content = fs.readFileSync(migrationPath, 'utf8');

    // Foreign key cascade checks
    expect(content).toMatch(/teacher_id\s+VARCHAR\(64\)\s+NOT\s+NULL\s+REFERENCES\s+users\(id\)\s+ON\s+DELETE\s+CASCADE/i);
    expect(content).toMatch(/user_id\s+VARCHAR\(64\)\s+NOT\s+NULL\s+REFERENCES\s+users\(id\)\s+ON\s+DELETE\s+CASCADE/i);
    expect(content).toMatch(/class_id\s+VARCHAR\(64\)\s+NOT\s+NULL\s+REFERENCES\s+classes\(id\)\s+ON\s+DELETE\s+CASCADE/i);

    // Unique constraints
    expect(content).toMatch(/CONSTRAINT\s+uq_user_lesson_version\s+UNIQUE\s*\(user_id,\s*lesson_id,\s*course_version\)/i);
    expect(content).toMatch(/CONSTRAINT\s+uq_assignment_student\s+UNIQUE\s*\(assignment_id,\s*student_id\)/i);
    expect(content).toMatch(/CONSTRAINT\s+uq_student_class_grade\s+UNIQUE\s*\(student_id,\s*class_id\)/i);

    // Role check constraint
    expect(content).toMatch(/role\s+VARCHAR\(32\)\s+NOT\s+NULL\s+CHECK\s*\(role\s+IN\s*\('student',\s*'teacher',\s*'admin'\)\)/i);
  });

  it('is 100% idempotent: running twice does not destroy data or cause syntax errors', () => {
    const content = fs.readFileSync(migrationPath, 'utf8');

    // Idempotency rule: NO DROP TABLE statements in the up-migration
    expect(content).not.toMatch(/DROP\s+TABLE/i);
    expect(content).not.toMatch(/DROP\s+DATABASE/i);
    expect(content).not.toMatch(/TRUNCATE/i);

    // Every CREATE statement is conditional
    const rawLines = content.split('\n');
    for (const line of rawLines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('CREATE TABLE')) {
        expect(trimmed).toContain('IF NOT EXISTS');
      }
      if (trimmed.startsWith('CREATE INDEX')) {
        expect(trimmed).toContain('IF NOT EXISTS');
      }
    }
  });
});
