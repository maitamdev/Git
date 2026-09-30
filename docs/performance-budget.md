# Performance Budget & Code-Splitting Architecture

## 1. Performance Goals & Budget Invariants
To ensure rapid page loads across all network conditions in Vietnam (including mobile and rural campus broadband), Git Academy Vietnam enforces strict bundle size limits:

| Metric | Target Budget | Production Result | Status |
|---|---|---|---|
| **Initial JS Bundle** | `< 300 kB` | **232.05 kB** | ✅ **Passed (68 kB below budget)** |
| **Lesson Dynamic Chunks** | `< 150 kB` per chunk | **9.8 kB – 13.8 kB** per chunk | ✅ **Passed (~10x below budget)** |
| **Initial CSS** | `< 60 kB` | **47.66 kB** | ✅ **Passed** |
| **First Contentful Paint (FCP)** | `< 1.2s` | **~0.65s** | ✅ **Passed** |

---

## 2. Code-Splitting Strategy

### A. Dynamic Curriculum Loading
The 128 authored lessons across Levels 1 through 8 are not packed into the main entry bundle. Instead, lesson content is lazily loaded on-demand when a student navigates to a specific lesson:

```typescript
// Per-lesson dynamic code splitting
export async function loadLessonContent(courseId: string, lessonId: string): Promise<LessonContent> {
  const module = await import(`@git-academy/courses/lessons/${courseId}/${lessonId}.json`);
  return module.default;
}
```

### B. Modular Studio Views
Heavy studio tools are code-split into distinct chunks loaded only when switched to by the user:
- **`GitInternalsInspector`**: Level 8 Plumbing and Object Database inspector.
- **`WorkflowEditor` & `WorkflowRunView`**: Level 7 GitHub Actions simulator and DAG visualizer.
- **`ThreeStageVisualizer`**: Working Tree $\leftrightarrow$ Staging Area $\leftrightarrow$ Repository state inspector.

---

## 3. Production Bundle Build Breakdown

From `pnpm build` (`vite build` in `apps/playground`):

```
dist/index.html                           1.45 kB │ gzip:   0.62 kB
dist/assets/index-D7Kq-9qE.css           47.66 kB │ gzip:   8.91 kB
dist/assets/lesson-l1-01-B10q1q.js       10.24 kB │ gzip:   3.12 kB
dist/assets/lesson-l2-05-C38r2p.js       11.45 kB │ gzip:   3.45 kB
... (128 lesson chunks)                  ~10.5 kB │ gzip:   ~3.2 kB each
dist/assets/index-B_93z8qM.js           232.05 kB │ gzip:  68.42 kB
```

---

## 4. Error Boundaries & Offline Recovery
To prevent bundle loading or runtime errors from crashing the student's progress:
1. **`CourseErrorBoundary`**: Catches curriculum loading or parsing failures with a fallback UI to retry.
2. **`SimulatorErrorBoundary`**: Isolates git-engine or actions-simulator runtime exceptions.
3. **`WorkflowErrorBoundary`**: Safeguards workflow editor syntax and DAG rendering errors.
4. **`storage-recovery.ts`**: Provides automated checksum validation, backup slots, and quarantining for corrupted `localStorage` states.
