import { describe, it, expect, beforeEach } from 'vitest';
import {
  MockAuthProvider,
  checkPermission,
  isTeacherOrAdmin,
  isAdmin,
  ROLE_PERMISSIONS,
} from '../src/index.js';
import type { UserRole, User } from '@git-academy/shared';

describe('Auth Package - RBAC & Permissions Matrix', () => {
  it('defines permissions for all standard roles', () => {
    expect(ROLE_PERMISSIONS.student).toBeDefined();
    expect(ROLE_PERMISSIONS.teacher).toBeDefined();
    expect(ROLE_PERMISSIONS.admin).toBeDefined();
  });

  it('grants student base learning permissions', () => {
    expect(checkPermission('student', 'course:view')).toBe(true);
    expect(checkPermission('student', 'course:learn')).toBe(true);
    expect(checkPermission('student', 'class:join')).toBe(true);
    expect(checkPermission('student', 'assignment:view')).toBe(true);
    expect(checkPermission('student', 'assignment:submit')).toBe(true);
    expect(checkPermission('student', 'progress:sync_own')).toBe(true);
  });

  it('denies teacher permissions to students', () => {
    expect(checkPermission('student', 'class:create')).toBe(false);
    expect(checkPermission('student', 'class:view_roster')).toBe(false);
    expect(checkPermission('student', 'class:manage_students')).toBe(false);
    expect(checkPermission('student', 'assignment:create')).toBe(false);
    expect(checkPermission('student', 'assignment:grade')).toBe(false);
    expect(checkPermission('student', 'progress:view_all')).toBe(false);
    expect(checkPermission('student', 'admin:manage_users')).toBe(false);
  });

  it('grants teaching and grading permissions to teachers', () => {
    expect(checkPermission('teacher', 'class:create')).toBe(true);
    expect(checkPermission('teacher', 'class:view_roster')).toBe(true);
    expect(checkPermission('teacher', 'class:manage_students')).toBe(true);
    expect(checkPermission('teacher', 'assignment:create')).toBe(true);
    expect(checkPermission('teacher', 'assignment:grade')).toBe(true);
    expect(checkPermission('teacher', 'progress:view_all')).toBe(true);
    expect(checkPermission('teacher', 'admin:manage_users')).toBe(false);
  });

  it('grants full administrative permissions to admin', () => {
    expect(isAdmin('admin')).toBe(true);
    expect(isAdmin('teacher')).toBe(false);
    expect(isAdmin('student')).toBe(false);
    expect(checkPermission('admin', 'admin:manage_users')).toBe(true);
    expect(checkPermission('admin', 'admin:manage_classes')).toBe(true);
    expect(checkPermission('admin', 'admin:view_audit')).toBe(true);
    expect(checkPermission('admin', 'admin:system_health')).toBe(true);
  });

  it('checks isTeacherOrAdmin correctly for User objects and role strings', () => {
    expect(isTeacherOrAdmin('teacher')).toBe(true);
    expect(isTeacherOrAdmin('admin')).toBe(true);
    expect(isTeacherOrAdmin('student')).toBe(false);

    const teacherUser: User = {
      id: 't-1',
      email: 't@edu.vn',
      displayName: 'Teacher',
      role: 'teacher',
      createdAt: '2026-09-01T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z',
    };
    expect(isTeacherOrAdmin(teacherUser)).toBe(true);

    const studentUser: User = { ...teacherUser, role: 'student' };
    expect(isTeacherOrAdmin(studentUser)).toBe(false);
  });

  it('returns false when checking permissions on null user', () => {
    expect(checkPermission(null, 'course:view')).toBe(false);
    expect(isTeacherOrAdmin(null)).toBe(false);
    expect(isAdmin(null)).toBe(false);
  });
});

describe('Auth Package - MockAuthProvider', () => {
  let provider: MockAuthProvider;

  beforeEach(() => {
    provider = new MockAuthProvider();
  });

  it('starts with null user when unauthenticated', async () => {
    const user = await provider.getCurrentUser();
    expect(user).toBeNull();
  });

  it('successfully signs in seeded student Khang', async () => {
    const user = await provider.signIn('khang@gitacademy.vn', 'Student@123');
    expect(user.id).toBe('user-student-khang');
    expect(user.displayName).toBe('Khang');
    expect(user.role).toBe('student');

    const current = await provider.getCurrentUser();
    expect(current?.id).toBe('user-student-khang');
  });

  it('successfully signs in seeded teacher Lan', async () => {
    const user = await provider.signIn('lan@gitacademy.vn', 'Teacher@123');
    expect(user.id).toBe('user-teacher-lan');
    expect(user.displayName).toBe('Cô Lan');
    expect(user.role).toBe('teacher');
  });

  it('successfully signs in seeded admin', async () => {
    const user = await provider.signIn('admin@gitacademy.vn', 'Admin@123');
    expect(user.id).toBe('user-admin');
    expect(user.role).toBe('admin');
  });

  it('rejects invalid password for seeded user', async () => {
    await expect(provider.signIn('khang@gitacademy.vn', 'WrongPass')).rejects.toThrow(
      'Mật khẩu không chính xác'
    );
  });

  it('rejects non-existent account when strict password is provided', async () => {
    await expect(provider.signIn('nonexistent@gitacademy.vn', 'AnyPass123')).rejects.toThrow(
      'Tài khoản không tồn tại'
    );
  });

  it('notifies onAuthStateChanged listeners on sign in and sign out', async () => {
    const history: (string | null)[] = [];
    const unsubscribe = provider.onAuthStateChanged((user) => {
      history.push(user ? user.id : null);
    });

    await provider.signIn('khang@gitacademy.vn', 'Student@123');
    await provider.signOut();

    expect(history).toEqual([null, 'user-student-khang', null]);
    unsubscribe();
  });

  it('can register a new student user and sign in immediately', async () => {
    const newUser = await provider.register(
      'learner_new@gitacademy.vn',
      'SecurePass123',
      'Lê Minh Tân',
      'student'
    );

    expect(newUser.email).toBe('learner_new@gitacademy.vn');
    expect(newUser.displayName).toBe('Lê Minh Tân');
    expect(newUser.role).toBe('student');

    const currentUser = await provider.getCurrentUser();
    expect(currentUser?.email).toBe('learner_new@gitacademy.vn');
  });

  it('prevents registering duplicate email addresses', async () => {
    await expect(
      provider.register('khang@gitacademy.vn', 'AnyPass123', 'Duplicate User', 'student')
    ).rejects.toThrow('Email này đã được sử dụng');
  });

  it('supports checking permission directly through provider instance', async () => {
    await provider.signIn('lan@gitacademy.vn', 'Teacher@123');
    const user = await provider.getCurrentUser();
    expect(provider.hasPermission(user, 'class:create')).toBe(true);
    expect(provider.hasPermission(user, 'admin:manage_users')).toBe(false);
  });
});
