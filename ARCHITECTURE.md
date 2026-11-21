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
  |     |     +-- AI placeholder
  |     |     +-- Account placeholder
  |     |
  |     +-- LoginPage
  |     +-- RegisterPage
  |
  +-- data/       local curriculum, lesson content, exercises, mock progress
  +-- types/      shared TypeScript domain types
  +-- services/   service layer placeholders
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

### `types/`
Shared domain types. These define the shape of levels, topics, lessons, exercises, user progress and profile.

### `services/`
A place for communication with external systems. The current `authService.ts` is a placeholder and only logs registration data; it is not a secure authentication implementation.

### `styles/`
Global CSS and design tokens. Page-specific CSS remains next to the corresponding page.

## Current data relationships

```text
Level
  └── Topic (Topic.levelId -> Level.id)
        └── Lesson (Lesson.topicId -> Topic.id)
              └── ExerciseQuestion (ExerciseQuestion.lessonId -> Lesson.id)

UserProgress
  └── LessonProgress (LessonProgress.lessonId -> Lesson.id)
```

IDs are important references. Do not casually rename them because roadmap, lesson content, exercise questions and progress all refer to them.

## Current data flow

### Roadmap and topic pages
1. Page imports `learningData` from `data/roadmap.ts`.
2. It selects the current level/topic/lessons using IDs.
3. It reads `mockProgress` from `data/mockProgress.ts`.
4. It calculates display progress from lesson statuses.

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
7. Does not currently persist the result or update mock progress.

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
