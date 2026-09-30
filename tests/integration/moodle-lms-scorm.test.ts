import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MoodleLmsAdapter, MockLmsAdapter, type LMSAdapter } from '../../platform/moodle/lms-adapter.js';

describe('Moodle, SCORM & LMS Integration Boundary (Spec #24, #25, #26)', () => {
  describe('MockLmsAdapter Simulation', () => {
    let adapter: MockLmsAdapter;

    beforeEach(() => {
      adapter = new MockLmsAdapter();
    });

    it('returns default test student user', async () => {
      const user = await adapter.getUser();
      expect(user.id).toBe('lms-user-test-01');
      expect(user.fullname).toBe('Nguyễn Văn Test');
      expect(user.roles).toContain('student');
    });

    it('tracks reported quiz and lab scores', async () => {
      await adapter.reportScore('lesson-01-intro', 85, 100);
      await adapter.reportScore('lesson-02-cli', 92, 100);

      expect(adapter.reportedScores).toHaveLength(2);
      expect(adapter.reportedScores[0]).toEqual({ lessonId: 'lesson-01-intro', score: 85, maxScore: 100 });
      expect(adapter.reportedScores[1]).toEqual({ lessonId: 'lesson-02-cli', score: 92, maxScore: 100 });
    });

    it('tracks lesson completion statuses', async () => {
      await adapter.reportCompletion('lesson-01-intro', 'completed');
      await adapter.reportCompletion('lesson-03-staging', 'incomplete');

      expect(adapter.reportedCompletions).toHaveLength(2);
      expect(adapter.reportedCompletions[0].status).toBe('completed');
      expect(adapter.reportedCompletions[1].status).toBe('incomplete');
    });

    it('provides launch context with course and activity metadata', async () => {
      const ctx = await adapter.getLaunchContext();
      expect(ctx.courseId).toBe('mock-course-101');
      expect(ctx.activityName).toBe('Interactive Git Lab');
    });
  });

  describe('SCORM 1.2 Runtime API Bridge', () => {
    let fakeScorm12Api: Record<string, any>;

    beforeEach(() => {
      const store: Record<string, string> = {};
      fakeScorm12Api = {
        LMSInitialize: vi.fn().mockReturnValue('true'),
        LMSSetValue: vi.fn((key: string, val: string) => {
          store[key] = val;
          return 'true';
        }),
        LMSGetValue: vi.fn((key: string) => store[key] || ''),
        LMSCommit: vi.fn().mockReturnValue('true'),
        LMSFinish: vi.fn().mockReturnValue('true'),
        _store: store,
      };

      vi.stubGlobal('window', {
        API: fakeScorm12Api,
      });
    });

    it('reports score to SCORM 1.2 CMI data model', async () => {
      const adapter = new MoodleLmsAdapter();
      await adapter.reportScore('lesson-branching', 88, 100);

      expect(fakeScorm12Api.LMSSetValue).toHaveBeenCalledWith('cmi.core.score.raw', '88');
      expect(fakeScorm12Api.LMSSetValue).toHaveBeenCalledWith('cmi.core.score.max', '100');
      expect(fakeScorm12Api.LMSCommit).toHaveBeenCalled();
      expect(fakeScorm12Api._store['cmi.core.score.raw']).toBe('88');
    });

    it('reports completed lesson status to SCORM 1.2 as passed', async () => {
      const adapter = new MoodleLmsAdapter();
      await adapter.reportCompletion('lesson-branching', 'completed');

      expect(fakeScorm12Api.LMSSetValue).toHaveBeenCalledWith('cmi.core.lesson_status', 'passed');
      expect(fakeScorm12Api.LMSCommit).toHaveBeenCalled();
    });

    it('reports incomplete lesson status to SCORM 1.2 as incomplete', async () => {
      const adapter = new MoodleLmsAdapter();
      await adapter.reportCompletion('lesson-branching', 'incomplete');

      expect(fakeScorm12Api.LMSSetValue).toHaveBeenCalledWith('cmi.core.lesson_status', 'incomplete');
    });
  });

  describe('SCORM 2004 Runtime API Bridge', () => {
    let fakeScorm2004Api: Record<string, any>;

    beforeEach(() => {
      const store: Record<string, string> = {};
      fakeScorm2004Api = {
        Initialize: vi.fn().mockReturnValue('true'),
        SetValue: vi.fn((key: string, val: string) => {
          store[key] = val;
          return 'true';
        }),
        GetValue: vi.fn((key: string) => store[key] || ''),
        Commit: vi.fn().mockReturnValue('true'),
        Terminate: vi.fn().mockReturnValue('true'),
        _store: store,
      };

      vi.stubGlobal('window', {
        API_1484_11: fakeScorm2004Api,
      });
    });

    it('reports score to SCORM 2004 CMI data model', async () => {
      const adapter = new MoodleLmsAdapter();
      await adapter.reportScore('lesson-rebase', 95, 100);

      expect(fakeScorm2004Api.SetValue).toHaveBeenCalledWith('cmi.score.raw', '95');
      expect(fakeScorm2004Api.SetValue).toHaveBeenCalledWith('cmi.score.max', '100');
      expect(fakeScorm2004Api.Commit).toHaveBeenCalled();
    });

    it('reports completion status to SCORM 2004 CMI data model', async () => {
      const adapter = new MoodleLmsAdapter();
      await adapter.reportCompletion('lesson-rebase', 'completed');

      expect(fakeScorm2004Api.SetValue).toHaveBeenCalledWith('cmi.completion_status', 'completed');
      expect(fakeScorm2004Api.Commit).toHaveBeenCalled();
    });
  });

  describe('Moodle Injected Global User Simulation', () => {
    it('parses window.MOODLE_USER when loaded inside Moodle iframe', async () => {
      vi.stubGlobal('window', {
        MOODLE_USER: {
          id: 4821,
          username: 'student.bk',
          email: 'student.bk@hcmut.edu.vn',
          firstname: 'Minh',
          lastname: 'Hoàng',
          roles: ['student', 'learner'],
        },
      });

      const adapter = new MoodleLmsAdapter();
      const user = await adapter.getUser();

      expect(user.id).toBe('4821');
      expect(user.username).toBe('student.bk');
      expect(user.fullname).toBe('Minh Hoàng');
      expect(user.roles).toContain('student');
    });
  });
});
