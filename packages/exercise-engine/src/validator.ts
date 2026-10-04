import {
  GitState,
  Scenario,
  ScenarioGoal,
  ValidationResult,
  GoalCheckItem,
} from '@git-academy/shared';

export class GoalValidator {
  public validate(scenario: Scenario, state: GitState): ValidationResult {
    const checklist: GoalCheckItem[] = [];
    const feedback: string[] = [];
    const goal = scenario.goal;

    // 1. Validate repository initialized
    const repoCheck: GoalCheckItem = {
      id: 'repo-init',
      description: 'Repository đã được khởi tạo với git init',
      passed: state.repositoryInitialized,
      feedback: state.repositoryInitialized
        ? undefined
        : 'Hãy chạy `git init` để khởi tạo kho chứa Git.',
    };
    checklist.push(repoCheck);

    // 2. Validate Commits
    if (goal.commits) {
      let commitCount = state.commits.length;
      const targetBranch = goal.commits.branch || state.currentBranch;
      const branchObj = state.branches.find((b) => b.name === targetBranch);
      const headTip = branchObj ? branchObj.commitHash : (state.head.type === 'detached' ? state.head.ref : null);

      if (headTip) {
        let count = 0;
        let currHash: string | null = headTip;
        const visited = new Set<string>();
        while (currHash && !visited.has(currHash)) {
          visited.add(currHash);
          const c = state.commits.find((item) => item.hash === currHash);
          if (!c) break;
          count++;
          currHash = c.parents.length > 0 ? c.parents[0] : null;
        }
        commitCount = count;
      }

      if (goal.commits.count !== undefined) {
        const passed = commitCount === goal.commits.count || state.commits.length === goal.commits.count;
        checklist.push({
          id: 'commit-count',
          description: `Số lượng commit đạt chính xác: ${goal.commits.count} (hiện tại: ${commitCount})`,
          passed,
          feedback: passed
            ? undefined
            : `Cần có chính xác ${goal.commits.count} commit, hiện có ${commitCount}.`,
        });
      }

      if (goal.commits.minCount !== undefined) {
        const passed = commitCount >= goal.commits.minCount || state.commits.length >= goal.commits.minCount;
        checklist.push({
          id: 'commit-min-count',
          description: `Tạo ít nhất ${goal.commits.minCount} commit (hiện tại: ${commitCount})`,
          passed,
          feedback: passed
            ? undefined
            : `Hãy tạo thêm commit để đạt tối thiểu ${goal.commits.minCount} commit.`,
        });
      }
    }

    // 3. Validate Latest Commit Message & Branch
    if (goal.latestCommit) {
      const headCommit = state.commits.length > 0 ? state.commits[state.commits.length - 1] : null;

      if (goal.latestCommit.message) {
        const passed = Boolean(
          headCommit &&
            headCommit.message.trim().toLowerCase() ===
              goal.latestCommit.message.trim().toLowerCase()
        );
        checklist.push({
          id: 'latest-commit-message',
          description: `Commit gần nhất có thông điệp: "${goal.latestCommit.message}"`,
          passed,
          feedback: passed
            ? undefined
            : headCommit
              ? `Commit message hiện tại là "${headCommit.message}", yêu cầu là "${goal.latestCommit.message}".`
              : 'Chưa có commit nào được tạo.',
        });
      }

      if (goal.latestCommit.messagePattern) {
        const regex = new RegExp(goal.latestCommit.messagePattern, 'i');
        const passed = Boolean(headCommit && regex.test(headCommit.message));
        checklist.push({
          id: 'latest-commit-pattern',
          description: `Commit message tuân thủ quy chuẩn (pattern: ${goal.latestCommit.messagePattern})`,
          passed,
          feedback: passed
            ? undefined
            : 'Commit message chưa đúng định dạng yêu cầu (ví dụ: "feat: ...").',
        });
      }
    }

    // 4. Validate Staging Area
    if (goal.stagingArea) {
      if (goal.stagingArea.clean) {
        const passed = state.stagingArea.length === 0;
        checklist.push({
          id: 'staging-clean',
          description: 'Staging area sạch sẽ (tất cả file đã được commit)',
          passed,
          feedback: passed
            ? undefined
            : 'Còn file chưa được commit trong staging area.',
        });
      }

      if (goal.stagingArea.stagedFiles) {
        const stagedPaths = state.stagingArea.map((f) => f.path);
        const allPresent = goal.stagingArea.stagedFiles.every((p) => stagedPaths.includes(p));
        checklist.push({
          id: 'staging-files',
          description: `Các file đã được stage: ${goal.stagingArea.stagedFiles.join(', ')}`,
          passed: allPresent,
          feedback: allPresent
            ? undefined
            : `Cần đưa các file [${goal.stagingArea.stagedFiles.join(', ')}] vào staging area bằng \`git add\`.`,
        });
      }
    }

    // 5. Validate Working Tree
    if (goal.workingTree) {
      if (goal.workingTree.clean) {
        const hasUncommitted = state.workingTree.some(
          (f) => f.status === 'modified' || f.status === 'untracked' || f.status === 'conflict'
        );
        checklist.push({
          id: 'working-tree-clean',
          description: 'Thư mục làm việc sạch sẽ (không còn thay đổi chưa lưu)',
          passed: !hasUncommitted,
          feedback: !hasUncommitted
            ? undefined
            : 'Còn thay đổi chưa được add hoặc commit trong thư mục làm việc.',
        });
      }

      if (goal.workingTree.requiredFiles) {
        for (const req of goal.workingTree.requiredFiles) {
          const file = state.workingTree.find((f) => f.path === req.path);
          let passed = Boolean(file);
          if (file && req.status) {
            passed = file.status === req.status;
          }
          if (file && req.contentIncludes) {
            passed = file.content.includes(req.contentIncludes);
          }

          checklist.push({
            id: `req-file-${req.path}`,
            description: `File '${req.path}' tồn tại đúng trạng thái yêu cầu`,
            passed,
            feedback: passed ? undefined : `File '${req.path}' chưa đạt trạng thái mong muốn.`,
          });
        }
      }
    }

    // 6. Validate Branches
    if (goal.branches) {
      if (goal.branches.current) {
        const passed = state.currentBranch === goal.branches.current;
        checklist.push({
          id: 'branch-current',
          description: `Đang đứng trên branch: '${goal.branches.current}'`,
          passed,
          feedback: passed
            ? undefined
            : `Cần chuyển sang branch '${goal.branches.current}' (hiện tại: '${state.currentBranch}').`,
        });
      }

      const reqBranches = goal.branches.exists || (goal.branches as any).required;
      if (reqBranches) {
        const existingBranches = state.branches.map((b) => b.name);
        const allExist = reqBranches.every((b: string) => existingBranches.includes(b));
        checklist.push({
          id: 'branch-exists',
          description: `Các branch tồn tại: ${reqBranches.join(', ')}`,
          passed: allExist,
          feedback: allExist
            ? undefined
            : `Cần tạo branch: ${reqBranches.join(', ')}`,
        });
      }
    }

    // 7. Validate HEAD
    if (goal.head) {
      const headGoal = goal.head;
      if (headGoal.pointsTo) {
        const headTarget = state.head.ref || state.currentBranch;
        const passed = headTarget === headGoal.pointsTo || state.currentBranch === headGoal.pointsTo;
        checklist.push({
          id: 'head-target',
          description: `Con trỏ HEAD trỏ tới: ${headGoal.pointsTo}`,
          passed,
          feedback: passed
            ? undefined
            : `HEAD cần trỏ tới '${headGoal.pointsTo}', hiện tại trỏ tới '${headTarget}'.`,
        });
      }
    }

    // Aggregate feedback
    for (const item of checklist) {
      if (!item.passed && item.feedback) {
        feedback.push(item.feedback);
      }
    }

    const allPassed = checklist.every((item) => item.passed);

    return {
      passed: allPassed,
      checklist,
      feedback,
      earnedXp: allPassed ? (scenario.success?.xp ?? 100) : 0,
    };
  }
}
