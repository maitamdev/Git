import { BUILTIN_SCENARIOS } from '../packages/git-scenarios/src/index';
import { ScenarioRunner } from '../packages/exercise-engine/src/runner';
import { validateGuidedLab } from '../apps/playground/src/learning/lab-validation';
import { GuidedPlumbingSession } from '../apps/playground/src/learning/plumbing-session';

console.log('=== SCENARIO CATALOG CHECK + SELECTED COMMAND WORKFLOW SMOKE TESTS ===\n');

interface LabCheckResult {
  id: string;
  title: string;
  hasHints: boolean;
  hintsCount: number;
  checklistCount: number;
  initialStateValid: boolean;
  workflowExecuted: boolean;
  guidedValidationWorks: boolean;
  notes: string;
}

const results: LabCheckResult[] = [];

for (const [id, scenario] of Object.entries(BUILTIN_SCENARIOS)) {
  const runner = new ScenarioRunner(scenario);
  const initial = runner.validate();
  const hintsCount = scenario.hints?.length || 0;
  const checklistCount = initial.checklist.length;
  const initialStateValid = Boolean(scenario.id && scenario.title?.trim() && Array.isArray(initial.checklist) && checklistCount > 0);

  let notes = 'Scenario và checklist được nạp; script này chưa thực thi đường hoàn thành của bài.';
  let workflowExecuted = false;
  let guidedValidationWorks = true;

  if (id === 'git-config-lab') {
    workflowExecuted = true;
    // Should NOT pass guided validation without running commands
    const initialGuided = validateGuidedLab(runner, []);
    if (initialGuided.passed) {
      guidedValidationWorks = false;
      notes = 'LỖI: git-config-lab pass khi chưa gõ lệnh';
    } else {
      const withCmds = validateGuidedLab(runner, ['git config user.name Alice', 'git config user.email alice@example.com']);
      if (!withCmds.passed) {
        guidedValidationWorks = false;
        notes = 'LỖI: git-config-lab không pass sau khi gõ lệnh';
      } else {
        notes = 'Yêu cầu thực thi lệnh git config trước khi đạt, tránh auto-pass.';
      }
    }
  } else if (id === 'internals-manual-commit-capstone') {
    workflowExecuted = true;
    const session = new GuidedPlumbingSession(runner);
    const cmds = [
      'BLOB=$(git hash-object -w capstone.txt)',
      'git update-index --add capstone.txt',
      'TREE=$(git write-tree)',
      'COMMIT=$(git commit-tree $TREE -m "feat: manual capstone commit")',
      'git update-ref refs/heads/main $COMMIT',
    ];
    const practiced: string[] = [];
    for (const c of cmds) {
      const res = session.execute(c);
      if (!res.success) {
        guidedValidationWorks = false;
        notes = `Lỗi lệnh plumbing: ${c} - ${res.stderr}`;
        break;
      }
      practiced.push(res.practicedCommand);
    }
    if (guidedValidationWorks) {
      const guided = validateGuidedLab(runner, practiced);
      if (!guided.passed) {
        guidedValidationWorks = false;
        notes = 'Capstone Level 8 không pass sau khi chạy chuỗi lệnh plumbing.';
      } else {
        notes = 'Toàn bộ chuỗi lệnh Plumbing (hash-object -> update-index -> write-tree -> commit-tree -> update-ref) chạy thành công 100%.';
      }
    }
  } else if (id === 'first-repository') {
    workflowExecuted = true;
    runner.execute('git init');
    runner.execute('git add README.md');
    runner.execute('git commit -m "Initial commit"');
    const guided = validateGuidedLab(runner, ['git init']);
    if (!guided.passed) {
      guidedValidationWorks = false;
      notes = 'LỖI: first-repository không pass sau git init';
    } else {
      notes = 'Level 1 Capstone: git init khởi tạo repo và thỏa mãn checklist.';
    }
  } else if (id === 'undo-working-tree-lab') {
    workflowExecuted = true;
    runner.execute('git restore config.json');
    if (!runner.validate().passed) {
      guidedValidationWorks = false;
      notes = 'LỖI: undo-working-tree-lab không pass sau git restore';
    } else {
      notes = 'Level 2 End Lab: git restore hoàn tác file modified về an toàn.';
    }
  } else if (id === 'advanced-git-master-challenge') {
    workflowExecuted = true;
    const commands = ['git reflog', 'git reset --hard HEAD~1', 'git reset --hard HEAD@{1}', 'git tag v1.0.0'];
    const practiced: string[] = [];
    for (const command of commands) {
      const result = runner.execute(command).commandResult;
      if (!result.success) {
        guidedValidationWorks = false;
        notes = `LỖI lệnh nâng cao: ${command} - ${result.stderr}`;
        break;
      }
      practiced.push(command);
    }
    if (guidedValidationWorks && !validateGuidedLab(runner, practiced).passed) {
      guidedValidationWorks = false;
      notes = 'LỖI: advanced-git-master-challenge không đạt sau khi truy vết, khôi phục và gắn tag.';
    } else if (guidedValidationWorks) {
      notes = 'Đã chạy reflog, reset để khôi phục commit, rồi tạo tag; validator yêu cầu đủ các lệnh thực hành.';
    }
  } else if (id === 'branching-challenge') {
    workflowExecuted = true;
    runner.execute('git switch -c feat/test');
    runner.getEngine().getFileSystem().writeFile('app.js', 'console.log("updated");');
    runner.execute('git add app.js');
    runner.execute('git commit -m "feat: update app"');
    runner.execute('git switch main');
    runner.execute('git merge feat/test');
    if (!runner.validate().passed) {
      guidedValidationWorks = false;
      notes = 'LỖI: branching-challenge không pass';
    } else {
      notes = 'Level 3 Capstone: switch -c -> edit -> commit -> switch main -> merge hoàn thành.';
    }
  } else if (id === 'team-project-simulation') {
    workflowExecuted = true;
    runner.execute('git switch -c feat/cart');
    runner.getEngine().getFileSystem().writeFile('cart.js', 'export const cart = [];');
    runner.execute('git add cart.js');
    runner.execute('git commit -m "feat: add cart"');
    runner.execute('git switch main');
    runner.execute('git merge feat/cart');
    if (!runner.validate().passed) {
      guidedValidationWorks = false;
      notes = 'LỖI: team-project-simulation không pass';
    } else {
      notes = 'Level 4 Capstone: feature branch team flow merge vào main thành công.';
    }
  } else if (id === 'capstone-ecommerce-team-scenario') {
    workflowExecuted = true;
    runner.execute('git switch -c feat/checkout');
    runner.getEngine().getFileSystem().writeFile('checkout.js', 'export const pay = true;');
    runner.execute('git add checkout.js');
    runner.execute('git commit -m "feat(checkout): add payment"');
    runner.execute('git switch main');
    runner.execute('git merge feat/checkout');
    if (!runner.validate().passed) {
      guidedValidationWorks = false;
      notes = 'LỖI: capstone-ecommerce-team-scenario không pass';
    } else {
      notes = 'Level 6 Capstone: checkout feature -> conventional commit -> merge main thành công.';
    }
  } else if (id === 'ci-cd-capstone') {
    workflowExecuted = true;
    const yaml = 'name: CI/CD Capstone\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm test\n  deploy:\n    needs: test\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm run deploy\n';
    runner.getEngine().getFileSystem().writeFile('.github/workflows/pipeline.yml', yaml);
    if (!runner.validate().passed) {
      guidedValidationWorks = false;
      notes = 'LỖI: ci-cd-capstone không pass';
    } else {
      notes = 'Level 7 Capstone: tạo workflow pipeline.yml với job dependencies (needs:) hoàn thành.';
    }
  }

  results.push({
    id,
    title: scenario.title,
    hasHints: hintsCount > 0,
    hintsCount,
    checklistCount,
    initialStateValid,
    workflowExecuted,
    guidedValidationWorks,
    notes,
  });
}

const failed = results.filter((r) => !r.initialStateValid || (r.workflowExecuted && !r.guidedValidationWorks));
const workflowsExecuted = results.filter((r) => r.workflowExecuted).length;
console.log(`Scenario catalog/checklist valid: ${results.length - results.filter((r) => !r.initialStateValid).length} / ${results.length}`);
console.log(`Command workflows executed: ${workflowsExecuted} / ${results.length}`);
console.log(`Remaining scenarios received structural checks only: ${results.length - workflowsExecuted}`);
if (failed.length > 0) {
  console.error('FAILED SCENARIOS:', failed);
  process.exit(1);
} else {
  console.log('✅ Catalog checks and selected command workflows passed. This is not evidence that every lab is completable end-to-end.');
}
