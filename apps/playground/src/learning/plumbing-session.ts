import type { ScenarioRunner } from '@git-academy/exercise-engine';
import type { Scenario } from '@git-academy/shared';
import {
  GitIndex, GitObjectSerializer, GitObjectStore, GitPlumbingRunner, GitRefStore,
  type PlumbingContext,
} from '@git-academy/git-internals';

export interface GuidedCommandResult { success: boolean; stdout: string; stderr: string; practicedCommand: string }

export interface PlumbingScenarioRunnerLike {
  getScenario(): Scenario;
  getEngine(): any;
  execute(command: string): any;
}

export class GuidedPlumbingSession {
  private context: PlumbingContext;
  private variables = new Map<string, string>();
  private successfulCommands: string[] = [];

  constructor(private runner: PlumbingScenarioRunnerLike) {
    const scenario = runner.getScenario();
    this.context = {
      objectStore: new GitObjectStore(),
      refStore: new GitRefStore(),
      index: new GitIndex(),
      files: Object.fromEntries(runner.getEngine().getState().workingTree.map((file: any) => [file.path, file.content])),
      authorName: 'Git Academy Learner',
      authorEmail: 'learner@gitacademy.local',
    };

    let parentHash: string | null = null;
    for (const commit of scenario.initialState.commits || []) {
      this.context.index.clear();
      for (const [path, content] of Object.entries(commit.files)) {
        const blob = GitObjectSerializer.createBlob(content);
        this.context.objectStore.put(blob);
        this.context.index.add({ path, hash: blob.hash, mode: '100644', stage: 0, size: content.length });
      }
      const treeHash = this.context.index.writeTree(this.context.objectStore);
      const object = GitObjectSerializer.createCommit({
        treeHash,
        parentHashes: parentHash ? [parentHash] : [],
        author: { name: 'Git Academy Learner', email: 'learner@gitacademy.local', timestamp: 1 },
        message: commit.message,
      });
      this.context.objectStore.put(object);
      parentHash = object.hash;
      this.context.refStore.setRef(`refs/heads/${commit.branch || scenario.initialState.branch || 'main'}`, object.hash);
    }

    this.context.index.clear();
    for (const file of scenario.initialState.files || []) {
      if (file.status !== 'added') continue;
      const blob = GitObjectSerializer.createBlob(file.content);
      this.context.objectStore.put(blob);
      this.context.index.add({ path: file.path, hash: blob.hash, mode: '100644', stage: 0, size: file.content.length });
    }
  }

  writeFile(path: string, content: string): void { this.context.files[path] = content; }

  execute(input: string): GuidedCommandResult {
    let command = input.trim();
    let variableName = '';
    const assignment = command.match(/^([A-Za-z_][A-Za-z_0-9]*)=\$\((git [^)]+)\)$/);
    if (assignment) {
      variableName = assignment[1];
      command = assignment[2];
    }
    command = command.replace(/\$([A-Za-z_][A-Za-z_0-9]*)/g, (_, name: string) => this.variables.get(name) || `$${name}`);
    const fail = (stderr: string): GuidedCommandResult => ({ success: false, stdout: '', stderr, practicedCommand: command });
    const ok = (stdout: string): GuidedCommandResult => {
      if (variableName) this.variables.set(variableName, stdout.trim());
      this.successfulCommands.push(command);
      return { success: true, stdout: variableName ? `${variableName}=${stdout}` : stdout, stderr: '', practicedCommand: command };
    };

    if (command.startsWith('git status') || command.startsWith('git log')) {
      const result = this.runner.execute(command).commandResult;
      return result.success ? ok(result.stdout) : fail(result.stderr);
    }
    if (command.startsWith('git ls-files')) return ok(this.context.index.entries().map((entry) => entry.path).join('\n'));
    if (command.startsWith('git count-objects')) {
      const stats = this.context.objectStore.getStats();
      return ok(`count: ${stats.totalCount}\ncommits: ${stats.commitCount}\ntrees: ${stats.treeCount}\nblobs: ${stats.blobCount}`);
    }
    if (command.startsWith('git update-ref ')) {
      const [, , ref, target] = command.split(/\s+/);
      if (!ref || !target) return fail('Cú pháp: git update-ref refs/heads/main <commit-hash|HEAD>');
      const hash = target === 'HEAD' ? this.context.refStore.getRef('HEAD') : target;
      if (!hash || this.context.objectStore.get(hash)?.type !== 'commit') return fail('Chưa tìm thấy commit hợp lệ. Hãy tạo commit-tree trước.');
      this.context.refStore.setRef(ref, hash);
      const result = ok(`Đã cập nhật ${ref} → ${hash}`);
      if (this.runner.getScenario().id === 'internals-manual-commit-capstone') {
        const needed = ['git hash-object -w', 'git update-index', 'git write-tree', 'git commit-tree', 'git update-ref'];
        if (needed.every((prefix) => this.successfulCommands.some((entry) => entry.startsWith(prefix)))) {
          // Mirror the completed plumbing commit into the standard scenario state for its goal check.
          this.runner.getEngine().execute('git add capstone.txt');
          this.runner.getEngine().execute('git commit -m "feat: manual plumbing commit"');
        }
      }
      return result;
    }
    const hashObject = command.match(/^git hash-object(?:\s+-w)?\s+(\S+)$/);
    if (hashObject && this.context.files[hashObject[1]] === undefined) return fail(`Không tìm thấy tệp ${hashObject[1]}.`);
    const commitTree = command.match(/^git commit-tree\s+(\S+)/);
    if (commitTree && this.context.objectStore.get(commitTree[1])?.type !== 'tree') return fail('Cần mã hash của một tree đã tạo bằng git write-tree.');
    const result = GitPlumbingRunner.execute(command, this.context);
    return result.exitCode === 0 ? ok(result.stdout) : fail(result.error || 'Lệnh chưa chạy được.');
  }
}
