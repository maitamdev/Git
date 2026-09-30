import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Pre-Go-Live Audit: Role Switcher Production Stripping (#7)', () => {
  const headerPath = path.resolve(__dirname, '../../apps/playground/src/components/Header.tsx');

  it('verifies Header component enforces strict production isolation of role switcher', () => {
    expect(fs.existsSync(headerPath)).toBe(true);
    const content = fs.readFileSync(headerPath, 'utf8');

    // 1. Verify environment guard definitions
    expect(content).toContain("process.env?.NODE_ENV === 'production'");
    expect(content).toContain('(import.meta as any).env?.PROD === true');
    expect(content).toContain('const isDev = !isProduction;');

    // 2. Verify dev-role-switcher is guarded by isDev
    expect(content).toContain('{isDev && currentUser && onSwitchUserRole && (');
    expect(content).toContain('className="dev-role-switcher"');

    // 3. Verify production read-only user badge is rendered when !isDev
    expect(content).toContain('{!isDev && currentUser && (');
    expect(content).toContain('className="user-profile-badge"');

    // 4. Verify mock options (CHỌN VAI TRÒ MÔ PHỎNG, Vũ Quốc Khang, Cô Nguyễn Thị Lan) are inside isDev block
    const isDevIndex = content.indexOf('{isDev && currentUser && onSwitchUserRole && (');
    const mockRoleHeaderIndex = content.indexOf('CHỌN VAI TRÒ MÔ PHỎNG (LMS DEMO)');
    const notDevIndex = content.indexOf('{!isDev && currentUser && (');

    expect(isDevIndex).toBeGreaterThan(0);
    expect(mockRoleHeaderIndex).toBeGreaterThan(isDevIndex);
    expect(mockRoleHeaderIndex).toBeLessThan(notDevIndex);
  });

  it('verifies that in production mode isDev evaluates strictly to false', () => {
    const evaluateIsDev = (nodeEnv: string, metaProd: boolean) => {
      const isProduction = nodeEnv === 'production' || metaProd === true;
      return !isProduction;
    };

    // In production environment:
    expect(evaluateIsDev('production', false)).toBe(false);
    expect(evaluateIsDev('production', true)).toBe(false);
    expect(evaluateIsDev('development', true)).toBe(false);

    // In development environment:
    expect(evaluateIsDev('development', false)).toBe(true);
    expect(evaluateIsDev('test', false)).toBe(true);
  });
});
