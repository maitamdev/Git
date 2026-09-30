import { User, UserRole } from '@git-academy/shared';
import { AuthCredentials, AuthProvider, Permission, Unsubscribe } from './types.js';
import { checkPermission } from './rbac.js';

export const SEED_USERS: User[] = [
  {
    id: 'user-student-khang',
    email: 'khang@gitacademy.vn',
    displayName: 'Khang',
    role: 'student',
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'user-teacher-lan',
    email: 'lan@gitacademy.vn',
    displayName: 'Cô Lan',
    role: 'teacher',
    createdAt: '2026-08-15T08:00:00.000Z',
    updatedAt: '2026-08-15T08:00:00.000Z',
  },
  {
    id: 'user-admin',
    email: 'admin@gitacademy.vn',
    displayName: 'Quản trị viên',
    role: 'admin',
    createdAt: '2026-08-01T08:00:00.000Z',
    updatedAt: '2026-08-01T08:00:00.000Z',
  },
];

export class MockAuthProvider implements AuthProvider {
  private currentUser: User | null = null;
  private users: Map<string, User> = new Map();
  private listeners: Set<(user: User | null) => void> = new Set();
  private storageKey = 'git_academy_mock_auth_user';

  constructor(initialUser?: User | null) {
    for (const u of SEED_USERS) {
      this.users.set(u.email.toLowerCase(), u);
      this.users.set(u.id, u);
    }

    if (initialUser) {
      this.currentUser = initialUser;
    } else if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(this.storageKey);
      if (stored) {
        try {
          this.currentUser = JSON.parse(stored);
        } catch {
          this.currentUser = null;
        }
      }
    }
  }

  private notify(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (this.currentUser) {
        window.localStorage.setItem(this.storageKey, JSON.stringify(this.currentUser));
      } else {
        window.localStorage.removeItem(this.storageKey);
      }
    }
    for (const listener of this.listeners) {
      try {
        listener(this.currentUser);
      } catch (err) {
        console.error('Error in auth state listener:', err);
      }
    }
  }

  public async getCurrentUser(): Promise<User | null> {
    return this.currentUser ? { ...this.currentUser } : null;
  }

  public async signIn(credentialsOrEmail: AuthCredentials | string, maybePassword?: string): Promise<User> {
    const email = typeof credentialsOrEmail === 'string' ? credentialsOrEmail : credentialsOrEmail.email;
    const password = typeof credentialsOrEmail === 'string' ? maybePassword : credentialsOrEmail.password;
    const emailKey = email.toLowerCase().trim();

    const expectedPasswords: Record<string, string> = {
      'khang@gitacademy.vn': 'Student@123',
      'lan@gitacademy.vn': 'Teacher@123',
      'admin@gitacademy.vn': 'Admin@123',
    };

    let user = this.users.get(emailKey);

    if (expectedPasswords[emailKey]) {
      if (password && password !== expectedPasswords[emailKey]) {
        throw new Error('Mật khẩu không chính xác');
      }
    } else if (!user) {
      if (password && !password.startsWith('mock_')) {
        throw new Error('Tài khoản không tồn tại');
      }
      // Auto-register mock user for frictionless local development if no strict password required
      user = {
        id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        email,
        displayName: email.split('@')[0],
        role: email.includes('teacher') ? 'teacher' : 'student',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.users.set(emailKey, user);
      this.users.set(user.id, user);
    }

    this.currentUser = { ...user! };
    this.notify();
    return { ...this.currentUser };
  }

  public async register(email: string, password: string, displayName: string, role: UserRole = 'student'): Promise<User> {
    const emailKey = email.toLowerCase().trim();
    if (this.users.has(emailKey)) {
      throw new Error('Email này đã được sử dụng');
    }

    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      email,
      displayName,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.set(emailKey, newUser);
    this.users.set(newUser.id, newUser);
    this.currentUser = { ...newUser };
    this.notify();
    return { ...this.currentUser };
  }

  public async signUp(credentials: AuthCredentials): Promise<User> {
    return this.signIn(credentials);
  }

  public async signOut(): Promise<void> {
    this.currentUser = null;
    this.notify();
  }

  public onAuthStateChanged(callback: (user: User | null) => void): Unsubscribe {
    this.listeners.add(callback);
    // Immediately invoke with current state
    callback(this.currentUser ? { ...this.currentUser } : null);
    return () => {
      this.listeners.delete(callback);
    };
  }

  public hasPermission(user: User | null, permission: Permission): boolean {
    return checkPermission(user, permission);
  }

  public switchUser(user: User | null): void {
    this.currentUser = user ? { ...user } : null;
    this.notify();
  }
}
