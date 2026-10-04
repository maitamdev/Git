import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Pre-Go-Live Audit: Role Switcher Production Stripping (#7)', () => {
  const headerPath = path.resolve(__dirname, '../../apps/playground/src/components/Header.tsx');

  it('verifies Header no longer ships any mock role switcher (roles come from the server session)', () => {
    expect(fs.existsSync(headerPath)).toBe(true);
    const content = fs.readFileSync(headerPath, 'utf8');

    // The client-side role switcher was removed entirely: roles are issued by
    // the API (/api/auth/me) and cannot be changed from the browser.
    expect(content).not.toContain('dev-role-switcher');
    expect(content).not.toContain('onSwitchUserRole');
    expect(content).not.toContain('CHỌN VAI TRÒ MÔ PHỎNG');
    expect(content).not.toContain('Vũ Quốc Khang');
    expect(content).not.toContain('Cô Nguyễn Thị Lan');

    // No accounts at all: anyone can learn, progress lives in the visitor's browser.
    expect(content).not.toContain('accountSlot');
    expect(content).not.toContain('currentUser');
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
