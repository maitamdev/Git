import {
  AchievementDefinition,
  CourseProgress,
  GitState,
} from '@git-academy/shared';
import { DEFAULT_ACHIEVEMENTS } from './default-achievements';

export class AchievementEngine {
  public checkAll(
    state: GitState,
    currentAchievements: string[] = []
  ): AchievementDefinition[] {
    const dummyProgress: CourseProgress = {
      userId: 'learner',
      totalXp: 0,
      level: 1,
      streakDays: 1,
      lessons: {},
      achievements: currentAchievements,
    };
    return this.checkAchievements(state, dummyProgress, DEFAULT_ACHIEVEMENTS);
  }

  public checkAchievements(
    state: GitState,
    progress: CourseProgress,
    definitions: AchievementDefinition[] = DEFAULT_ACHIEVEMENTS
  ): AchievementDefinition[] {
    const list = definitions || DEFAULT_ACHIEVEMENTS || [];
    const newlyUnlocked: AchievementDefinition[] = [];

    for (const def of list) {
      if (!def || progress.achievements.includes(def.id)) {
        continue;
      }

      const cond = def.condition;
      let matched = false;

      switch (cond.type) {
        case 'repository_initialized': {
          const isInit = Boolean(state.repositoryInitialized);
          const target = cond.value === true || cond.value === 'true' || cond.value === 1 || cond.value === '1';
          matched = cond.operator === '==' ? isInit === target : isInit;
          break;
        }

        case 'commit_count': {
          const count = state.commits.length;
          matched = this.evaluateNumber(count, cond.operator, Number(cond.value));
          break;
        }

        case 'branch_count': {
          const count = state.branches.length;
          matched = this.evaluateNumber(count, cond.operator, Number(cond.value));
          break;
        }

        case 'merge_count': {
          const mergeCommits = state.commits.filter((c) => c.parents.length > 1).length;
          matched = this.evaluateNumber(mergeCommits, cond.operator, Number(cond.value));
          break;
        }

        case 'conflict_resolved': {
          const hasResolved = state.commits.some(
            (c) =>
              c.parents.length > 1 &&
              (c.message.toLowerCase().includes('conflict') ||
                c.message.toLowerCase().includes('merge'))
          );
          matched = hasResolved;
          break;
        }

        case 'quiz_score': {
          const highestScore = Math.max(
            0,
            ...Object.values(progress.lessons).map((l) => l.quizScore)
          );
          matched = this.evaluateNumber(highestScore, cond.operator, Number(cond.value));
          break;
        }

        case 'lesson_completed': {
          const completedCount = Object.values(progress.lessons).filter(
            (l) => l.completed
          ).length;
          matched = this.evaluateNumber(completedCount, cond.operator, Number(cond.value));
          break;
        }

        case 'lab_completed': {
          const allCompletedLabs = new Set<string>();
          for (const l of Object.values(progress.lessons)) {
            if (l.labsCompleted) {
              for (const lab of l.labsCompleted) {
                allCompletedLabs.add(lab);
              }
            }
          }
          if (typeof cond.value === 'string' && isNaN(Number(cond.value))) {
            matched = allCompletedLabs.has(cond.value);
          } else {
            matched = this.evaluateNumber(allCompletedLabs.size, cond.operator, Number(cond.value));
          }
          break;
        }

        case 'command_used': {
          const targetCmd = String(cond.value).toLowerCase();
          const inReflog = state.reflog.some(
            (r) => r.action.toLowerCase().includes(targetCmd) || r.message.toLowerCase().includes(targetCmd)
          );
          matched = inReflog;
          break;
        }

        case 'xp_total': {
          matched = this.evaluateNumber(progress.totalXp, cond.operator, Number(cond.value));
          break;
        }
      }

      if (matched) {
        newlyUnlocked.push(def);
      }
    }

    return newlyUnlocked;
  }

  private evaluateNumber(actual: number, operator: string, target: number): boolean {
    switch (operator) {
      case '>=':
        return actual >= target;
      case '>':
        return actual > target;
      case '==':
        return actual === target;
      default:
        return false;
    }
  }
}
