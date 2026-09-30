export interface LmsUser {
  id: string;
  username: string;
  email: string;
  fullname: string;
  roles: string[];
}

export interface LmsContext {
  courseId: string;
  courseName: string;
  activityId: string;
  activityName: string;
  returnUrl?: string;
  customParameters?: Record<string, string>;
}

export interface LMSAdapter {
  getUser(): Promise<LmsUser>;
  reportScore(lessonId: string, score: number, maxScore?: number): Promise<void>;
  reportCompletion(lessonId: string, status: 'completed' | 'incomplete'): Promise<void>;
  getLaunchContext(): Promise<LmsContext>;
}

/**
 * Standard Moodle LMS Adapter implementing external REST web service & SCORM runtime bridge
 */
export class MoodleLmsAdapter implements LMSAdapter {
  constructor(
    private moodleBaseUrl: string = process.env.MOODLE_URL || 'http://localhost:8080/moodle',
    private token?: string
  ) {}

  public async getUser(): Promise<LmsUser> {
    if (typeof window !== 'undefined' && (window as any).MOODLE_USER) {
      const u = (window as any).MOODLE_USER;
      return {
        id: String(u.id),
        username: u.username,
        email: u.email,
        fullname: u.fullname || `${u.firstname} ${u.lastname}`,
        roles: u.roles || ['student'],
      };
    }

    return {
      id: 'moodle-guest-01',
      username: 'student.moodle',
      email: 'student@moodle.local',
      fullname: 'Moodle Student',
      roles: ['student'],
    };
  }

  public async reportScore(lessonId: string, score: number, maxScore: number = 100): Promise<void> {
    // 1. SCORM 1.2 / 2004 Runtime API Bridge if running within an iframe
    if (typeof window !== 'undefined') {
      const win = window as any;
      const api = win.API || win.parent?.API || win.API_1484_11 || win.parent?.API_1484_11;
      if (api) {
        if (api.LMSSetValue) {
          // SCORM 1.2
          api.LMSSetValue('cmi.core.score.raw', String(score));
          api.LMSSetValue('cmi.core.score.max', String(maxScore));
          api.LMSCommit('');
        } else if (api.SetValue) {
          // SCORM 2004
          api.SetValue('cmi.score.raw', String(score));
          api.SetValue('cmi.score.max', String(maxScore));
          api.Commit('');
        }
      }
    }

    // 2. Moodle WebService REST API fallback (core_grade_update_grades)
    if (this.token && typeof fetch !== 'undefined') {
      try {
        await fetch(`${this.moodleBaseUrl}/webservice/rest/server.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            wstoken: this.token,
            wsfunction: 'core_grade_update_grades',
            moodlewsrestformat: 'json',
            source: 'git-academy',
            itemnumber: '0',
            grades: JSON.stringify([{ rawgrade: score }]),
          }),
        });
      } catch (err) {
        console.warn('[MoodleLmsAdapter] Không thể gửi điểm tới Moodle WebService:', err);
      }
    }
  }

  public async reportCompletion(lessonId: string, status: 'completed' | 'incomplete'): Promise<void> {
    if (typeof window !== 'undefined') {
      const win = window as any;
      const api = win.API || win.parent?.API || win.API_1484_11 || win.parent?.API_1484_11;
      if (api) {
        if (api.LMSSetValue) {
          api.LMSSetValue('cmi.core.lesson_status', status === 'completed' ? 'passed' : 'incomplete');
          api.LMSCommit('');
        } else if (api.SetValue) {
          api.SetValue('cmi.completion_status', status === 'completed' ? 'completed' : 'incomplete');
          api.Commit('');
        }
      }
    }
  }

  public async getLaunchContext(): Promise<LmsContext> {
    return {
      courseId: 'course-git-vn',
      courseName: 'Git & GitHub Academy Vietnam',
      activityId: 'activity-git-core',
      activityName: 'Luyện tập Git Tương tác',
      returnUrl: this.moodleBaseUrl,
    };
  }
}

/**
 * Mock LMS Adapter for offline testing and simulated headless runs
 */
export class MockLmsAdapter implements LMSAdapter {
  public reportedScores: Array<{ lessonId: string; score: number; maxScore: number }> = [];
  public reportedCompletions: Array<{ lessonId: string; status: 'completed' | 'incomplete' }> = [];

  constructor(
    public currentUser: LmsUser = {
      id: 'lms-user-test-01',
      username: 'test.learner',
      email: 'test@lms.local',
      fullname: 'Nguyễn Văn Test',
      roles: ['student'],
    }
  ) {}

  public async getUser(): Promise<LmsUser> {
    return this.currentUser;
  }

  public async reportScore(lessonId: string, score: number, maxScore: number = 100): Promise<void> {
    this.reportedScores.push({ lessonId, score, maxScore });
  }

  public async reportCompletion(lessonId: string, status: 'completed' | 'incomplete'): Promise<void> {
    this.reportedCompletions.push({ lessonId, status });
  }

  public async getLaunchContext(): Promise<LmsContext> {
    return {
      courseId: 'mock-course-101',
      courseName: 'Git Foundations Test',
      activityId: 'mock-act-01',
      activityName: 'Interactive Git Lab',
    };
  }
}
