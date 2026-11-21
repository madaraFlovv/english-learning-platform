# Project Status

Last reviewed against GitHub branch: `frontend`.

## Overall status

**Frontend prototype / foundation stage.** The project has a working navigation and learning flow for the currently populated sample content. Most product features are not yet connected to a backend.

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
| Account | Placeholder | No profile or statistics UI |
| AI Tutor | Placeholder | No AI provider integration |
| Placement test | Not implemented | No onboarding or level assessment |
| Backend API | Not implemented | No server application in repository |
| Database | Not implemented | No schema or migrations |
| Persistent progress | Not implemented | Progress exists in React memory only and resets on reload |
| Automated tests | Not configured in package scripts | No test runner currently listed |

## Current routes

- `/`
- `/topic/:topicId`
- `/lesson/:lessonId`
- `/exercise/:lessonId`
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
- `frontend/src/services/authService.ts` — registration placeholder.

## Known limitations / things to verify

1. Learning pages read roadmap data directly, while ExercisePage reads the combined aggregator. Keep this distinction in mind.
2. Progress updates are held in React Context memory and disappear after a browser reload.
3. Exercise completion updates the shared progress state; no server or database is involved.
4. Lesson content and exercise coverage are incomplete across the curriculum.
5. Login/register forms are not connected to a real authentication service.
6. AI and Account routes render a generic placeholder.
7. No backend, database, API contract, test runner or deployment configuration is currently present in the repository.
8. The current repository tree has the application nested under `frontend/`; run npm commands from that directory.

## Next recommended milestone

Finish a coherent frontend learning loop using mock data:
1. Ensure the exercise flow has clear completion and retry behavior.
2. Connect exercise completion to a small, well-defined mock progress layer (without pretending it is persistent or server-backed).
3. Reflect updated lesson status and best score on Topic and Roadmap pages.
4. Add exercises and lesson content incrementally, beginning with the remaining Present Simple lessons.
5. Add tests when the core data/progress logic becomes stable.
