# Project Status

Last reviewed against GitHub branch: `frontend` (2026-11-22).

## Overall status

**Frontend prototype / foundation stage.** The project has a working navigation and learning flow for the currently populated sample content. Most product features are not yet connected to a backend.

## Design system status

| Area | Status | Notes |
|---|---|---|
| Brand | In progress | Product name is Englishly; custom snake-inspired logo is still pending |
| Design tokens | Implemented | Shared spacing, radius, shadow and layout tokens |
| Light / dark themes | Implemented in code | Green palettes; local theme preference is restored before route rendering |
| CSS Modules | Implemented for current pages | AppLayout, Roadmap, Topic, Lesson, Exercise, Placeholder, Login and Register |
| Visual verification | Pending | Must be checked in the local browser at desktop and mobile sizes |

## Feature status

| Area | Status | Notes |
|---|---|---|
| App entry and routing | Implemented | React Router routes are configured |
| Shared app layout | Implemented | Sidebar and nested page outlet |
| Roadmap UI | Prototype implemented | Uses static curriculum and mock progress |
| A1–C1 curriculum structure | Data structure implemented | Lesson content is incomplete |
| Topic page | Implemented | Lists lessons for a topic |
| Lesson page | Implemented | Renders available typed lesson content |
| Exercise engine | Implemented for current question types | Multiple choice and fill-in-the-blanks |
| Present Simple exercises | Implemented | 8 questions for `present-simple` |
| Exercises for other lessons | Not implemented | Shows coming-soon state |
| Exercise result → user progress | Implemented in mock state | Completing an exercise updates the shared Progress Context; not persistent across reloads |
| Registration | UI / placeholder only | No real account creation |
| Login | UI only | No authentication |
| Account | Initial UI + per-level progress overview | Shows mock learning statistics, calculates lesson completion for A1–C1 from `lessonProgress`, and allows changing current level within the verified range |
| AI Tutor | Placeholder | No AI provider integration |
| Placement test | Initial frontend version implemented | 20 questions across A1–C1; deterministic level estimate; result records the highest verified level in memory |
| Backend API | Not implemented | No server application in repository |
| Database | Not implemented | No schema or migrations |
| Persistent progress | Not implemented | Progress exists in React memory only and resets on reload |
| Automated tests | Not configured in package scripts | No test runner currently listed |

## Current routes

- `/`
- `/topic/:topicId`
- `/lesson/:lessonId`
- `/exercise/:lessonId`
- `/placement-test`
- `/ai`
- `/account`
- `/login`
- `/register`

## Current key files

- `frontend/src/App.tsx` — mounts RouterProvider.
- `frontend/src/app/router.tsx` — route definitions.
- `frontend/src/components/AppLayout/AppLayout.tsx` — shared navigation shell.
- `frontend/src/types/learning.ts` — shared learning domain types.
- `frontend/src/data/roadmap.ts` — levels, topics and lessons.
- `frontend/src/data/learningData.ts` — combined learning data including exercise sets.
- `frontend/src/data/mockProgress.ts` — hardcoded progress.
- `frontend/src/data/exercises/lessons/lessonContent.ts` — lesson content.
- `frontend/src/data/exercises/lessons/presentSimple.ts` — 8 Present Simple questions.
- `frontend/src/pages/ExercisePage/ExercisePage.tsx` — exercise flow.
- `frontend/src/pages/PlacementTestPage/PlacementTestPage.tsx` — placement test and result flow.
- `frontend/src/pages/AccountPage/AccountPage.tsx` — account overview and current learning-level selector.
- `frontend/src/context/ProgressContext.tsx` — current/verified level rules and in-memory progress.
- `frontend/src/data/placementQuestions.ts` — initial 20-question A1–C1 bank.
- `frontend/src/services/placementService.ts` — deterministic placement scoring.
- `frontend/src/services/authService.ts` — registration placeholder.

## Known limitations / things to verify

1. Learning pages read roadmap data directly, while ExercisePage reads the combined aggregator. Keep this distinction in mind.
2. Progress updates are held in React Context memory and disappear after a browser reload.
3. Exercise completion updates the shared progress state; no server or database is involved.
4. Lesson content and exercise coverage are incomplete across the curriculum.
5. Login/register forms are not connected to a real authentication service.
6. AI Tutor remains a generic placeholder. Account is an initial UI backed by mock progress.
7. No backend, database, API contract, test runner or deployment configuration is currently present in the repository.
8. The current repository tree has the application nested under `frontend/`; run npm commands from that directory.

## Next recommended milestone

1. Verify the current/verified level flow and Account selector in the local browser.
2. Run `npm run build` and `npm run lint` from `frontend/`; fix any issues found.
3. Add automated tests for placement scoring and level-selection rules.
4. Continue refining Account after visual verification; profile identity and persistent data require real authentication/backend work.
5. Build the onboarding handoff around registration and placement results.
6. Continue expanding A1 lesson content, with explanations in Russian and English examples with translations.
7. Add subtle animations only after the core learning flow is stable.
