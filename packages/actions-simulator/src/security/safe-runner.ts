export interface CommandExecutionContext {
  workingDirectory: string;
  env: Record<string, string>;
  files?: Record<string, string>;
  failingCommands?: string[];
}

export interface CommandExecutionResult {
  exitCode: number;
  stdout: string[];
  stderr: string[];
}

export class SafeCommandRuntime {
  /**
   * Safe educational command execution sandbox.
   * STRICT GUARANTEE: Never invokes host shell, child_process, eval, or node process.
   */
  public static execute(
    commandLine: string,
    context: CommandExecutionContext
  ): CommandExecutionResult {
    const rawCmd = (commandLine || '').trim();
    const stdout: string[] = [];
    const stderr: string[] = [];

    // Check if command is intentionally configured to fail in this scenario/test
    if (context.failingCommands && context.failingCommands.some((c) => rawCmd.includes(c))) {
      stderr.push(`Command "${rawCmd}" failed with exit code 1 (simulated test failure).`);
      return { exitCode: 1, stdout, stderr };
    }

    // Split multi-line commands or handle chain commands
    const lines = rawCmd.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

    for (let line of lines) {
      // 0. Host security guards (reject dangerous calls safely before anything else)
      if (
        line.includes('rm -rf') ||
        line.includes('curl') ||
        line.includes('wget') ||
        line.includes('sudo') ||
        line.includes('eval') ||
        line.includes('shutdown') ||
        line.includes('reboot') ||
        line.includes('killall') ||
        line.includes('kill -9') ||
        line.includes('chmod -R') ||
        line.includes('chown') ||
        line.includes('nc ') ||
        line.includes('telnet') ||
        line.includes('mkfs') ||
        line.includes('dd if=') ||
        line.includes('format c:') ||
        line.includes('del /') ||
        line.includes(':(){ :|:& };:') ||
        line.includes('bash -c') ||
        line.includes('sh -c') ||
        line.includes('powershell') ||
        line.includes('cmd.exe')
      ) {
        stdout.push(`[SafeRuntime Guard] Host security policy intercepted command: "${line}".`);
        stdout.push('[SafeRuntime Guard] Arbitrary host network/file operations are strictly isolated.');
        continue;
      }

      // Expand environment variables: $VAR or ${VAR}
      line = line.replace(/\$\{?([A-Za-z0-9_]+)\}?/g, (match, varName) => {
        return context.env && context.env[varName] !== undefined ? context.env[varName] : match;
      });

      // 1. Echo command
      if (line.startsWith('echo ')) {
        const message = line.slice(5).replace(/^["']|["']$/g, '');
        stdout.push(message);
        continue;
      }

      // 2. npm / pnpm / yarn package manager simulation
      if (/^(npm|pnpm|yarn)\s+(i|install|add)(\s+|$)/.test(line)) {
        stdout.push(`+ Simulated package installation in ${context.workingDirectory}`);
        stdout.push('added 245 packages in 1.4s');
        stdout.push('audit: 0 vulnerabilities found');
        continue;
      }

      if (/^(npm|pnpm|yarn)\s+(test|run test)(\s+|$)/.test(line) || line.startsWith('vitest') || line.startsWith('jest')) {
        if (context.env['FAIL_TESTS'] === 'true' || line.includes('--fail')) {
          stderr.push('FAIL src/app.test.ts');
          stderr.push('  ✕ unit test expected 200 received 500');
          stderr.push('Tests: 1 failed, 14 passed, 15 total');
          return { exitCode: 1, stdout, stderr };
        }
        stdout.push('PASS tests/unit/app.test.ts');
        stdout.push('PASS tests/unit/service.test.ts');
        stdout.push('Tests: 15 passed, 15 total');
        stdout.push('Snapshots: 0 total');
        stdout.push('Time: 1.25s');
        continue;
      }

      if (/^(npm|pnpm|yarn)\s+(run\s+)?build(\s+|$)/.test(line)) {
        stdout.push('> project@1.0.0 build');
        stdout.push('> tsc && vite build');
        stdout.push('✓ 42 modules transformed.');
        stdout.push('dist/index.html   1.2 kB');
        stdout.push('dist/assets/app.js 45.8 kB');
        stdout.push('✓ built in 1.1s');
        continue;
      }

      if (/^(npm|pnpm|yarn)\s+(run\s+)?lint(\s+|$)/.test(line) || line.startsWith('eslint')) {
        stdout.push('Checking formatting and code quality...');
        stdout.push('All 24 files pass linting rules cleanly.');
        continue;
      }

      // 3. Node or Python invocation
      if (line.startsWith('node ') || line.startsWith('python ') || line.startsWith('python3 ')) {
        stdout.push(`[Runtime] Executing ${line.split(' ')[1]} in simulated sandbox.`);
        stdout.push('Execution completed successfully with exit code 0.');
        continue;
      }

      // 4. Basic file utilities
      if (line.startsWith('ls') || line.startsWith('dir')) {
        stdout.push('package.json');
        stdout.push('src/');
        stdout.push('dist/');
        stdout.push('README.md');
        continue;
      }

      if (line.startsWith('cat ') || line.startsWith('type ')) {
        const target = line.split(/\s+/)[1];
        if (context.files && context.files[target]) {
          stdout.push(context.files[target]);
        } else {
          stdout.push(`Simulated content for ${target}`);
        }
        continue;
      }

      if (line.startsWith('mkdir ') || line.startsWith('touch ')) {
        stdout.push(`Created simulated target: ${line.split(' ')[1]}`);
        continue;
      }

      // Generic command fallback
      stdout.push(`[Simulated Runner] ${line}`);
    }

    return { exitCode: 0, stdout, stderr };
  }
}
