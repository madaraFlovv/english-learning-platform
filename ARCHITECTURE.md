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
  |     |     +-- Account placeholder
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
`ProgressContext.tsx` exposes the current in-memory `UserProgress` and a `completeLesson` action to pages through React Context. The provider is mounted around the router in `App.tsx` so all route pages share the same state.

### `services/`
Contains domain operations that should not be coupled to page rendering. `progressService.ts` exports a pure function that returns updated progress after lesson completion. The current `authService.ts` is a placeholder and only logs registration data; it is not a secure authentication implementation.

### `styles/`
Global base styles, shared design tokens and theme palettes. Page/component styling uses CSS Modules (`*.module.css`) so local selectors do not leak across routes. `tokens.css` defines spacing, radii, shadows and layout dimensions; `themes.css` defines semantic light/dark color variables; `globals.css` imports both and provides base styles.

## Current data relationships

```text
Level
  └── Topic (Topic.levelId -> Level.id)
        └── Lesson (Lesson.topicId -> Topic.id)
              └── ExerciseQuestion (ExerciseQuestion.lessonId -> Lesson.id)

UserProgress
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

- `ProgressContext` initializes reactive in-memory `UserProgress` state from `mockProgress.ts`.
- `progressService.ts` owns the pure update rule and does not depend on React.
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
