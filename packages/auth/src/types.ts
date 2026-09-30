import { User, UserRole } from '@git-academy/shared';

export type Permission =
  | 'course:view'
  | 'course:learn'
  | 'class:join'
  | 'class:create'
  | 'class:edit'
  | 'class:delete'
  | 'class:view_roster'
  | 'class:manage_students'
  | 'assignment:view'
  | 'assignment:submit'
  | 'assignment:create'
  | 'assignment:grade'
  | 'progress:sync_own'
  | 'progress:view_all'
  | 'admin:manage_users'
  | 'admin:manage_classes'
  | 'admin:view_audit'
  | 'admin:system_health';

export type Unsubscribe = () => void;

export interface AuthCredentials {
  email: string;
  password?: string;
  displayName?: string;
  role?: UserRole;
}

export interface AuthProvider {
  getCurrentUser(): Promise<User | null>;
  signIn(credentials: AuthCredentials): Promise<User>;
  signUp?(credentials: AuthCredentials): Promise<User>;
  signOut(): Promise<void>;
  onAuthStateChanged(callback: (user: User | null) => void): Unsubscribe;
  hasPermission(user: User | null, permission: Permission): boolean;
}
