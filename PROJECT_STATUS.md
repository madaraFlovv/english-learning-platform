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
| Roadmap UI | Prototype implemented | Uses static curriculum and mock progress; displays all A1–C1 level tabs, with locked levels available as read-only curriculum previews |
| A1–C1 curriculum structure | Data structure implemented | Lesson content is incomplete |
| Topic page | Implemented | Lists lessons for a topic |
| Lesson page | Implemented | Renders available typed lesson content; direct access to locked levels is blocked in the UI |
| Exercise engine | Implemented for current question types | Multiple choice and fill-in-the-blanks; locked-level exercises are blocked in the UI |
| Present Simple exercises | Implemented | 8 questions for `present-simple` |
| Exercises for other lessons | Not implemented | Shows coming-soon state |
| Exercise result → user progress | Implemented in mock state | Completing an exercise updates the shared Progress Context; not persistent across reloads |
| Registration | UI / placeholder only | No real account creation |
| Login | UI only | No authentication |
| Account | Initial profile + per-level progress overview | Shows a demo profile card, mock learning statistics, calculates lesson completion for A1–C1 from `lessonProgress`, and allows changing current level within the verified range |
| AI Tutor | Placeholder | No AI provider integration |
| Placement test | Initial frontend version implemented | 20 questions across A1–C1; deterministic level estimate; result records the highest verified level in memory |
| Backend API | Not implemented | Shared frontend HTTP client is prepared; no server application or live endpoints exist |
| Database | Not implemented | No schema or migrations |
| Persistent progress | Not implemented | Progress exists in React memory only and resets on reload |
| Automated tests | Not configured in package scripts | No test runner currently listed; scoring and progress rules still need automated coverage |

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
- `frontend/src/data/mockUserProfile.ts` — demo-only profile data.
- `frontend/src/data/exercises/lessons/lessonContent.ts` — lesson content.
- `frontend/src/data/exercises/lessons/presentSimple.ts` — 8 Present Simple questions.
- `frontend/src/pages/ExercisePage/ExercisePage.tsx` — exercise flow.
- `frontend/src/pages/PlacementTestPage/PlacementTestPage.tsx` — placement test and result flow.
- `frontend/src/pages/AccountPage/AccountPage.tsx` — account overview and current learning-level selector.
- `frontend/src/context/ProgressContext.tsx` — current/verified level rules and in-memory progress.
- `frontend/src/data/placementQuestions.ts` — initial 20-question A1–C1 bank.
- `frontend/src/services/placementService.ts` — deterministic placement scoring.
- `frontend/src/services/authService.ts` — explicit demo login/registration results; it does not log or transmit credentials.
- `frontend/src/services/apiClient.ts` — shared HTTP client foundation with normalized API errors; not connected to live endpoints yet.
- `frontend/src/services/levelAccessService.ts` — shared frontend rule for checking whether a level is unlocked.
- `frontend/src/services/curriculumService.ts` — centralized mock curriculum access used by pages and context.
- `frontend/src/services/progressService.ts` — mock progress read plus pure rules for level selection, placement verification and lesson completion.
- `frontend/src/services/profileService.ts` — centralized mock profile read used by Account.
- `API_CONTRACT.md` — draft API endpoint and security contract; no API is implemented yet.

## Known limitations / things to verify

2. Progress updates are held in React Context memory and disappear after a browser reload.
3. Exercise completion updates the shared progress state; no server or database is involved.
4. Lesson content and exercise coverage are incomplete across the curriculum.
5. Login/register forms are not connected to a real authentication service.
6. AI Tutor remains a generic placeholder. Account is an initial UI backed by mock progress.
7. No backend, database, implemented API, test runner or deployment configuration is currently present. `API_CONTRACT.md` is a planning draft only.
8. The current repository tree has the application nested under `frontend/`; run npm commands from that directory.

## Next recommended milestone

1. Pull the latest frontend branch and run the local build and lint checks.
2. Manually verify the main routes and learning flows in the browser.
3. Select the backend framework and database, then refine the API contract.
4. Implement the basic backend flow and replace mock service adapters with API calls.
5. Add the planned module-based curriculum and module assessments during the curriculum/backend redesign.
6. Return to visual redesign after the basic backend flow works.
## Frontend-to-backend readiness review

The frontend integration foundation is prepared, but the product frontend is not feature-complete:

- curriculumService.ts, progressService.ts and profileService.ts isolate mock data behind feature-service boundaries.
- apiClient.ts provides a shared JSON HTTP client, cookie credentials by default, and normalized ApiError failures. It is infrastructure only; no feature service calls it until matching backend endpoints exist.
- authService.ts explicitly reports that login and registration are not configured. The login and registration pages now show this state and do not transmit or log credentials.
- .env.example documents the public VITE_API_BASE_URL setting. It must never contain secrets.
- Placement scoring now reads level definitions through curriculumService and rejects an empty or incomplete level question bank.

Still intentionally outside this frontend foundation milestone: real authentication, persistence, AI Tutor, module-level curriculum and skip tests, complete A1–C1 lesson/exercise content, onboarding, automated tests, and final visual polish. The browser UI still requires a local build/lint run and manual route-flow verification after pulling the latest branch. Do not claim these items are complete.
