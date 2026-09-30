import { GitObjectStore } from '../objects/object-store';
import { GitRefStore } from '../refs/ref-store';
import { GitIndex } from '../index/index-model';
import { GitObjectSerializer } from '../objects/serializer';
import { RevisionResolver } from '../revisions/revision-resolver';
import { GitGarbageCollector } from '../pack/pack-model';

export interface PlumbingCommandResult {
  stdout: string;
  exitCode: number;
  error?: string;
}

export interface PlumbingContext {
  objectStore: GitObjectStore;
  refStore: GitRefStore;
  index: GitIndex;
  files: Record<string, string>; // simulated working directory
  authorName?: string;
  authorEmail?: string;
}

export class GitPlumbingRunner {
  public static execute(
    commandLine: string,
    context: PlumbingContext
  ): PlumbingCommandResult {
    const raw = (commandLine || '').trim();
    if (!raw.startsWith('git ')) {
      return { stdout: '', exitCode: 1, error: 'Not a git command' };
    }

    const args = raw.slice(4).trim().split(/\s+/);
    const subCmd = args[0];

    // 1. git hash-object [-w] [--stdin] <file>
    if (subCmd === 'hash-object') {
      const write = args.includes('-w');
      const filename = args[args.length - 1];
      const content = context.files[filename] !== undefined ? context.files[filename] : '';
      const blob = GitObjectSerializer.createBlob(content);
      if (write) {
        context.objectStore.put(blob);
      }
      return { stdout: blob.hash, exitCode: 0 };
    }

    // 2. git cat-file (-p | -t | -s) <hash>
    if (subCmd === 'cat-file') {
      const flag = args[1]; // -p, -t, or -s
      const targetHashOrRev = args[2];
      const resolvedHash = RevisionResolver.resolve(targetHashOrRev, context.refStore, context.objectStore) || targetHashOrRev;
      const obj = context.objectStore.get(resolvedHash);

      if (!obj) {
        return {
          stdout: '',
          exitCode: 1,
          error: `fatal: Not a valid object name ${targetHashOrRev}`,
        };
      }

      if (flag === '-t') return { stdout: obj.type, exitCode: 0 };
      if (flag === '-s') return { stdout: String(obj.size), exitCode: 0 };
      if (flag === '-p') return { stdout: obj.content, exitCode: 0 };

      return { stdout: obj.content, exitCode: 0 };
    }

    // 3. git update-index [--add] [--cacheinfo <mode> <hash> <path>] <path>
    if (subCmd === 'update-index') {
      const cacheinfoIdx = args.indexOf('--cacheinfo');
      if (cacheinfoIdx !== -1) {
        const mode = args[cacheinfoIdx + 1];
        const hash = args[cacheinfoIdx + 2];
        const path = args[cacheinfoIdx + 3];
        context.index.add({
          mode,
          hash,
          path,
          stage: 0,
          size: 100,
        });
        return { stdout: '', exitCode: 0 };
      }

      const path = args[args.length - 1];
      const content = context.files[path] || '';
      const blob = GitObjectSerializer.createBlob(content);
      context.objectStore.put(blob);
      context.index.add({
        mode: '100644',
        hash: blob.hash,
        path,
        stage: 0,
        size: content.length,
      });
      return { stdout: '', exitCode: 0 };
    }

    // 4. git write-tree
    if (subCmd === 'write-tree') {
      const treeHash = context.index.writeTree(context.objectStore);
      return { stdout: treeHash, exitCode: 0 };
    }

    // 5. git commit-tree <tree-hash> [-p <parent-hash>] -m "<message>"
    if (subCmd === 'commit-tree') {
      const treeHash = args[1];
      const parents: string[] = [];
      let message = 'Manual commit';

      for (let i = 2; i < args.length; i++) {
        if (args[i] === '-p' && args[i + 1]) {
          parents.push(args[i + 1]);
          i++;
        } else if (args[i] === '-m' && args[i + 1]) {
          // Join quoted string
          const rawMsg = raw.slice(raw.indexOf('-m') + 2).trim();
          message = rawMsg.replace(/^["']|["']$/g, '');
          break;
        }
      }

      const commitObj = GitObjectSerializer.createCommit({
        treeHash,
        parentHashes: parents,
        author: {
          name: context.authorName || 'Vietnam Student',
          email: context.authorEmail || 'student@gitacademy.vn',
          timestamp: Math.floor(Date.now() / 1000),
        },
        message,
      });

      context.objectStore.put(commitObj);
      return { stdout: commitObj.hash, exitCode: 0 };
    }

    // 6. git rev-parse <rev>
    if (subCmd === 'rev-parse') {
      const rev = args[1] || 'HEAD';
      const hash = RevisionResolver.resolve(rev, context.refStore, context.objectStore);
      if (!hash) {
        return { stdout: '', exitCode: 1, error: `fatal: ambiguous argument '${rev}': unknown revision` };
      }
      return { stdout: hash, exitCode: 0 };
    }

    // 7. git show-ref
    if (subCmd === 'show-ref') {
      const refs = context.refStore.listRefs();
      const output = refs.map((r) => `${r.hash} ${r.name}`).join('\n');
      return { stdout: output, exitCode: 0 };
    }

    // 8. git symbolic-ref <name> [target]
    if (subCmd === 'symbolic-ref') {
      const name = args[1];
      const target = args[2];
      if (target) {
        context.refStore.setSymbolicRef(name, target);
        return { stdout: '', exitCode: 0 };
      }
      const currentTarget = context.refStore.getSymbolicRef(name);
      if (!currentTarget) {
        return { stdout: '', exitCode: 1, error: `fatal: ref ${name} is not a symbolic ref` };
      }
      return { stdout: currentTarget, exitCode: 0 };
    }

    // 9. git gc
    if (subCmd === 'gc') {
      const gcRes = GitGarbageCollector.runGc(context.refStore, context.objectStore);
      const out = [
        `Counting objects: ${gcRes.reachableCount + gcRes.unreachableCount}, done.`,
        `Compressing objects: 100% (${gcRes.packedObjectsCount}/${gcRes.packedObjectsCount}), done.`,
        `Writing objects: 100% (${gcRes.packedObjectsCount}/${gcRes.packedObjectsCount}), done.`,
        `Total ${gcRes.packedObjectsCount} (delta compressed), reused 0 (delta 0), pack saved ${gcRes.savingsPercent}% space.`,
      ].join('\n');
      return { stdout: out, exitCode: 0 };
    }

    return { stdout: '', exitCode: 1, error: `Unsupported plumbing command: ${subCmd}` };
  }
}
