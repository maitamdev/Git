import { User } from '@git-academy/shared';
import { AuthCredentials, AuthProvider, Permission, Unsubscribe } from './types.js';
import { checkPermission } from './rbac.js';

export class ApiAuthProvider implements AuthProvider {
  private currentUser: User | null = null;
  private listeners: Set<(user: User | null) => void> = new Set();
  private baseUrl: string;

  constructor(baseUrl?: string) {
    const envApi = typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL
      ? `${(import.meta as any).env.VITE_API_URL.replace(/\/+$/, '')}/api/auth`
      : '/api/auth';
    this.baseUrl = baseUrl || envApi;
    // Initial fetch in background
    this.refreshCurrentUser().catch(() => {});
  }

  private notify(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.currentUser);
      } catch (err) {
        console.error('Error in auth listener:', err);
      }
    }
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('git_academy_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  public async refreshCurrentUser(): Promise<User | null> {
    try {
      const res = await fetch(`${this.baseUrl}/me`, {
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        this.currentUser = data.user || null;
      } else {
        this.currentUser = null;
      }
    } catch {
      this.currentUser = null;
    }
    this.notify();
    return this.currentUser;
  }

  public async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  public async signIn(credentials: AuthCredentials): Promise<User> {
    const res = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Sign in failed' }));
      throw new Error(err.message || 'Authentication error');
    }

    const data = await res.json();
    if (data.token && typeof localStorage !== 'undefined') {
      localStorage.setItem('git_academy_token', data.token);
    }
    this.currentUser = data.user;
    this.notify();
    return this.currentUser!;
  }

  public async signUp(credentials: AuthCredentials): Promise<User> {
    const res = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Sign up failed' }));
      throw new Error(err.message || 'Registration error');
    }

    const data = await res.json();
    if (data.token && typeof localStorage !== 'undefined') {
      localStorage.setItem('git_academy_token', data.token);
    }
    this.currentUser = data.user;
    this.notify();
    return this.currentUser!;
  }

  public async signOut(): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });
    } catch {
      // Ignore network errors on logout
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('git_academy_token');
    }
    this.currentUser = null;
    this.notify();
  }

  public onAuthStateChanged(callback: (user: User | null) => void): Unsubscribe {
    this.listeners.add(callback);
    callback(this.currentUser);
    return () => {
      this.listeners.delete(callback);
    };
  }

  public hasPermission(user: User | null, permission: Permission): boolean {
    return checkPermission(user, permission);
  }
}
