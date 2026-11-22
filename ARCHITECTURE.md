# Architecture

## Current architecture

The repository currently contains a single frontend application under `frontend/`. It is a React SPA built with Vite and TypeScript.

There is no backend or database yet. The current architecture is intentionally frontend-first: pages consume typed local data and mock progress so the learning experience can be developed before API and persistence concerns are introduced.

## High-level structure

```text
Browser
  |
  v
React application (frontend/src)
  |
  +-- App.tsx
  |     |
  |     v
  |   React Router
  |     |
  |     +-- AppLayout
  |     |     +-- LandingPage
  |     |     +-- TopicPage
  |     |     +-- LessonPage
  |     |     +-- ExercisePage
      |     +-- PlacementTestPage
  |     |     +-- AI placeholder
  |     |     +-- AccountPage
  |     |
  |     +-- LoginPage
  |     +-- RegisterPage
  |
  +-- context/    shared reactive progress state
  +-- data/       local curriculum, lesson content, exercises, initial mock progress
  +-- types/      shared TypeScript domain types
  +-- services/   progress update rules and service placeholders
  +-- styles/     global design tokens and styles
```

## Responsibility by folder

### `app/`
Application-level setup. The router belongs here; route definitions should not be scattered across pages.

### `components/`
Reusable application components and layout. `AppLayout` owns the sidebar and renders nested route content through `Outlet`.

### `pages/`
Route-level screens. Pages read route parameters, select relevant data, render UI and coordinate user interactions. Keep business rules out of large page components when they become reusable or complex.

### `data/`
Static application content and prototype data:
- `roadmap.ts`: CEFR levels, topics and lessons.
- `learningData.ts`: aggregate data source for the exercise flow.
- `mockProgress.ts`: sample user progress.
- `exercises/lessons/`: lesson content and lesson-specific exercise data.
- `placementQuestions.ts`: fixed, typed question bank for the initial level assessment.

### `types/`
Shared domain types. These define the shape of levels, topics, lessons, exercises, user progress and profile.

### `context/`
`ProgressContext.tsx` exposes the in-memory `UserProgress`, lesson completion, current-level selection and verified-level recording actions to pages through React Context. The provider is mounted around the router in `App.tsx` so all route pages share the same state.

### `services/`
Contains domain operations that should not be coupled to page rendering. `progressService.ts` provides the mock progress read adapter and pure update rules for level selection, placement verification and lesson completion. `profileService.ts` provides the mock profile read adapter. Pages and React Context should use these feature services instead of importing mock data directly. The current `authService.ts` is a placeholder that reports registration as not configured; it does not transmit or log credentials.

### `styles/`
Global base styles, shared design tokens and theme palettes. Page/component styling uses CSS Modules (`*.module.css`) so local selectors do not leak across routes. `tokens.css` defines spacing, radii, shadows and layout dimensions; `themes.css` defines semantic light/dark color variables; `globals.css` imports both and provides base styles.

## Current data relationships

```text
Level
  └── Topic (Topic.levelId -> Level.id)
        └── Lesson (Lesson.topicId -> Topic.id)
              └── ExerciseQuestion (ExerciseQuestion.lessonId -> Lesson.id)

UserProgress
  ├── currentLevelId / highestVerifiedLevelId (references Level.id)
  └── LessonProgress (LessonProgress.lessonId -> Lesson.id)

PlacementTestQuestion
  └── PlacementTestResult (estimated CEFR level + per-level score breakdown)
```

IDs are important references. Do not casually rename them because roadmap, lesson content, exercise questions and progress all refer to them.

## Current data flow

### Roadmap and topic pages
1. Page imports curriculum data from `data/roadmap.ts`.
2. It reads the current `UserProgress` through `useProgress()` from `ProgressContext`.
3. It selects the current level/topic/lessons using IDs.
4. It calculates display progress from the shared in-memory lesson statuses.

### Placement test
1. `PlacementTestPage` reads the static question bank from `data/placementQuestions.ts`.
2. Answers are kept in local component state for the duration of the test.
3. `placementService.ts` normalizes answers and calculates correct answers per CEFR band.
4. A band is passed when at least 75% of its questions are correct; the estimated level is the highest consecutive passed band starting at A1.
5. The page calls `setCurrentLevel` from `ProgressContext` and displays the level plus per-band results.
6. This is only an indicative grammar/vocabulary placement estimate. It is not persisted and does not constitute official CEFR certification.

### Lesson page
1. Reads `lessonId` from the route.
2. Finds the lesson in roadmap data.
3. Finds its topic and level.
4. Reads content from `data/exercises/lessons/lessonContent.ts`.
5. Renders blocks based on their discriminated `type`.

### Exercise page
1. Reads `lessonId` from the route.
2. Finds the lesson in the combined `data/learningData.ts`.
3. Filters questions by `question.lessonId`.
4. Sorts them by `order`.
5. Keeps current answer, feedback and score in React component state.
6. Displays a result at the end.
7. On completion, calls `completeLesson` from `ProgressContext` with the lesson ID and score percentage.
8. The context applies the pure update rule from `progressService.ts`; Roadmap and Topic pages re-render with the updated progress.
9. The update exists only in React memory and resets when the app reloads.

## Progress state rules

- `ProgressContext` initializes reactive in-memory `UserProgress` state through `getProgress()` from `progressService.ts`.
- `highestVerifiedLevelId` stores the highest level reached by the placement test; it is not the same as the user's selected `currentLevelId`.
- `setCurrentLevel` rejects levels above the verified maximum. Before a test has been completed, the user is limited to the initial A1 level.
- `recordVerifiedLevel` only raises the verified maximum. Retaking the test with a lower result does not remove a previously verified level or overwrite the user's current choice.
- `progressService.ts` owns the mock progress read and pure update rules; it does not depend on React. `profileService.ts` owns the mock profile read.
- Completing an exercise marks the lesson as `completed` and stores the best score percentage (a lower retry score does not replace a higher score).
- `completedLessonsCount` is recalculated from lesson records to avoid count drift.
- Roadmap and Topic pages consume the shared context, so they reflect exercise completion immediately.
- This is still a temporary mock implementation: progress resets on reload and is not associated with a real authenticated user.

## Planned evolution (not implemented yet)

Keep the architecture simple as it grows:

```text
Frontend (React)
  |
  | HTTPS API requests
  v
Backend API
  |
  +-- Authentication / authorization
  +-- Learning and progress services
  +-- AI tutor service
  |
  +-- Relational database
  |
  +-- External AI provider (server-side only)
```

Potential backend modules:
- Auth: registration, login, session/token lifecycle and authorization.
- Curriculum: read levels, topics, lessons and exercises.
- Progress: record attempts, best scores, completed lessons and streak rules.
- AI Tutor: validate requests, enforce limits, build provider prompts and return responses.

The exact backend framework, database and authentication strategy have not yet been selected. Do not invent decisions in code or documentation before they are discussed.

## Security requirements for the future backend

- Never store raw passwords. Use a well-maintained password hashing algorithm through a trusted library.
- Never put private API keys in frontend source or browser-exposed environment variables.
- Enforce authorization on the backend; hiding a UI element is not authorization.
- Validate and constrain all incoming API data.
- Add rate limiting and cost controls to AI endpoints.
- Treat user-provided text as untrusted input; do not allow prompt injection to override system rules.
- Avoid logging passwords, tokens or other secrets.


## API-ready frontend boundaries

The frontend should depend on application services rather than making HTTP requests from page components.

Target data flow:

```text
Page / Component
      |
      v
Context or feature hook (shared client state)
      |
      v
Feature service (auth, curriculum, progress, placement)
      |
      +---- mock implementation (current prototype)
      |
      +---- HTTP API implementation (future backend)
                    |
                    v
                Backend API
```

Rules for the transition:
- Keep React components unaware of endpoint URLs, HTTP headers and response parsing.
- Keep pure domain calculations (for example, scoring a placement test or calculating a best lesson score) separate from network requests.
- Define request/response DTOs at the API boundary; do not automatically treat every backend response as trusted domain data.
- Use one shared HTTP client for the base URL, JSON parsing, credentials/session behavior and normalized API errors.
- Read the API base URL from a Vite environment variable such as `VITE_API_BASE_URL`. This value is public configuration, never a secret.
- Keep provider keys, database credentials, password hashes and signing secrets exclusively on the backend.
- Prefer an HttpOnly, Secure, SameSite cookie-based session for a browser app when the eventual backend supports it. Do not put long-lived authentication tokens in localStorage.
- Backend authorization must validate ownership of progress and profile records. Frontend route guards and locked UI are only presentation, not security.
- Replace mock service implementations behind stable feature-service interfaces; avoid changing page components just because the data source changes.

Do not add an unused HTTP client or fake API endpoints before the backend contract is agreed. The current prototype can be prepared through service boundaries and a documented contract first.


## Curriculum service boundary

Pages and feature components read curriculum through `services/curriculumService.ts`, not by importing static data modules directly. The current implementation is synchronous and backed by local mock curriculum data. This centralizes the data source without introducing an unused HTTP client.

When the backend is ready, the curriculum service will become asynchronous. Add a query/cache layer (for example TanStack Query) at that stage to manage loading, caching, refetching and errors consistently.
