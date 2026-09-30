import { User, UserRole } from '@git-academy/shared';
import { Permission } from './types.js';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  student: [
    'course:view',
    'course:learn',
    'class:join',
    'assignment:view',
    'assignment:submit',
    'progress:sync_own',
  ],
  teacher: [
    'course:view',
    'course:learn',
    'class:join',
    'class:create',
    'class:edit',
    'class:delete',
    'class:view_roster',
    'class:manage_students',
    'assignment:view',
    'assignment:create',
    'assignment:grade',
    'progress:sync_own',
    'progress:view_all',
  ],
  admin: [
    'course:view',
    'course:learn',
    'class:join',
    'class:create',
    'class:edit',
    'class:delete',
    'class:view_roster',
    'class:manage_students',
    'assignment:view',
    'assignment:submit',
    'assignment:create',
    'assignment:grade',
    'progress:sync_own',
    'progress:view_all',
    'admin:manage_users',
    'admin:manage_classes',
    'admin:view_audit',
    'admin:system_health',
  ],
};

export function checkPermission(userOrRole: User | UserRole | null, permission: Permission): boolean {
  if (!userOrRole) return false;
  const role: UserRole = typeof userOrRole === 'string' ? userOrRole : userOrRole.role;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function isTeacherOrAdmin(userOrRole: User | UserRole | null): boolean {
  if (!userOrRole) return false;
  const role: UserRole = typeof userOrRole === 'string' ? userOrRole : userOrRole.role;
  return role === 'teacher' || role === 'admin';
}

export function isAdmin(userOrRole: User | UserRole | null): boolean {
  if (!userOrRole) return false;
  const role: UserRole = typeof userOrRole === 'string' ? userOrRole : userOrRole.role;
  return role === 'admin';
}
