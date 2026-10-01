# Curriculum and Release Audit — Git Academy

Last updated: 2026-10-01. This file records the current course inventory and the limits of the checks. Automated structural checks are not proof that every explanation is correct for every learner or that all third-party services are available.

## Inventory

| Level | Topic | Lessons | Simulator labs |
| ---: | --- | ---: | ---: |
| 1 | Git Foundations | 9 | 3 |
| 2 | Git Basics | 12 | 8 |
| 3 | Branching and Merging | 14 | 10 |
| 4 | GitHub Collaboration | 16 | 9 |
| 5 | Advanced Git | 22 | 16 |
| 6 | Team Workflows | 15 | 7 |
| 7 | GitHub Actions and CI/CD | 20 | 14 |
| 8 | Git Internals | 20 | 9 |
| **Total** | **8 levels** | **128** | **76** |

All 128 lessons have a quiz and a challenge. The remaining 52 lessons have guided self-check activities rather than an automatically graded Git simulator. There are 77 registered scenarios.

## Release checks

| Check | Current result | What it verifies |
| --- | --- | --- |
| `pnpm generate:courses` | PASS, 128 lessons generated | Authored lesson data compiles into app course data. |
| `pnpm validate:content` | PASS, 128/128 | Required content and quiz structure. |
| `pnpm validate:courses` | PASS, 128/128 | Manifest, lesson folders, prerequisite graph and required sections. |
| `pnpm validate:scenarios` | PASS, 77/77 | Scenario definitions and manifest references are valid. |
| `pnpm audit:content` | PASS | Every lesson has a quiz and challenge; reports simulator coverage. |
| `pnpm audit:curriculum` | PASS | Manifest, files, generated course data, DAG, search index, quizzes and challenges agree. |
| `pnpm test` | PASS, 63 files / 1,036 tests | Unit and integration suites, including simulator, course progression and all 8 level content checks. |
| Vercel-style filtered build | PASS | `pnpm --filter playground... build` from `apps/playground` builds the frontend and its workspace dependencies. |
| Browser smoke test | PASS for lesson 1 | Anonymous entry; 5/5 quiz answers; completion screen; next lesson unlock; progress retained after reload. Production bundle opens the map and lazy-loads Lesson 1. |

## Learner access and progress

Learners enter directly into the course map without an account. Lessons and levels are presented in course order; completing a lesson advances the learner to the next available lesson. Progress is stored in the current browser on the current device. It does not sync across browsers or devices and can be lost if site data is cleared.

## Limits of the audit

- The 77-scenario validator checks definitions and references; it does not execute every lab through the UI. Engine tests cover implemented Git operations, but this audit is not a manual completion record for all labs.
- The browser smoke test covers the first lesson, not all 128 lessons or every device and browser combination.
- No student pilot or independent instructional-design review has been run. The course is suitable for an initial public self-study release with feedback, not a claim of experimentally validated teaching outcomes.
- Local tests and build cannot confirm that a Vercel project is connected to this repository, that its settings match, or that the production deployment is live. Verify the Vercel deployment after pushing.

See [teaching-quality-audit.md](teaching-quality-audit.md) for the content review and teaching structure details. See [deploy-vercel.md](deploy-vercel.md) for anonymous frontend deployment settings.
