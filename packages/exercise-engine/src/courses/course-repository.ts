import { CourseLesson, CourseManifest, CourseRepository } from '@git-academy/shared';
import { BUILTIN_SCENARIOS } from '@git-academy/git-scenarios';
import { COURSE_MANIFEST, loadLessonContent } from './generated/course-data';

export class BuiltinCourseRepository implements CourseRepository {
  private manifest: CourseManifest;
  private lessons: Map<string, CourseLesson>;

  constructor(customManifest?: CourseManifest, customLessons?: Record<string, CourseLesson>) {
    this.manifest = customManifest || COURSE_MANIFEST;
    this.lessons = new Map();
    if (customLessons) {
      for (const [key, lesson] of Object.entries(customLessons)) {
        this.lessons.set(key, lesson);
        this.lessons.set(`${lesson.moduleId}/${lesson.id}`, lesson);
      }
    }
  }

  public async getManifest(): Promise<CourseManifest> {
    return this.manifest;
  }

  public async getLesson(moduleId: string, lessonId: string): Promise<CourseLesson | null> {
    const combinedKey = `${moduleId}/${lessonId}`;
    if (this.lessons.has(combinedKey)) {
      return this.lessons.get(combinedKey)!;
    }
    if (this.lessons.has(lessonId)) {
      return this.lessons.get(lessonId)!;
    }

    // Try dynamic loading on demand
    const loaded = await loadLessonContent(moduleId, lessonId);
    if (loaded) {
      const manifestLesson = this.manifest.curriculum
        .find((module) => module.id === moduleId)?.lessons
        .find((lesson) => lesson.id === lessonId);
      const scenarios = manifestLesson?.labIds
        ?.map((id) => BUILTIN_SCENARIOS[id as keyof typeof BUILTIN_SCENARIOS])
        .filter((scenario) => Boolean(scenario));
      const hydrated = scenarios?.length ? { ...loaded, labScenarios: scenarios } : loaded;
      this.lessons.set(combinedKey, hydrated);
      this.lessons.set(lessonId, hydrated);
      return hydrated;
    }

    // Handle legacy numbering aliases (e.g. 05-git-commit vs 06-git-commit vs 09-git-commit)
    const aliases: Record<string, string> = {
      '05-git-commit': '06-git-commit',
      '09-git-commit': '06-git-commit',
      '02-git-la-gi': '03-git-la-gi',
      '03-git-vs-github': '05-git-vs-github',
      '04-repository': '08-repository',
      '13-branch': '01-branch-concept',
      '14-head': '02-head-pointer',
      '15-switch': '04-git-switch',
      '16-merge': '07-fast-forward-merge',
      '17-merge-conflict': '10-merge-conflict',
    };

    if (aliases[lessonId]) {
      const aliasLesson = await this.getLesson(moduleId, aliases[lessonId]);
      if (aliasLesson) return aliasLesson;
    }

    // Try finding by suffix in already cached lessons
    for (const [key, lesson] of this.lessons.entries()) {
      if (key.endsWith(lessonId) || lesson.id.endsWith(lessonId.replace(/^\d+-/, ''))) {
        return lesson;
      }
    }

    return null;
  }

  public async getAllLessons(): Promise<CourseLesson[]> {
    // For full iteration if requested, dynamically load all lessons if cache is empty
    if (this.lessons.size === 0) {
      for (const mod of this.manifest.curriculum) {
        if (mod.status === 'coming_soon') continue;
        for (const les of mod.lessons || []) {
          await this.getLesson(mod.id, les.id);
        }
      }
    }
    const set = new Set<CourseLesson>();
    for (const lesson of this.lessons.values()) {
      set.add(lesson);
    }
    return Array.from(set);
  }
}
