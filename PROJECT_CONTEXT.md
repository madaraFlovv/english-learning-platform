# English Path — Project Context

> This document is the primary source of context for AI coding assistants. Read it before changing code.

## 1. Product overview

**English Path** is a web platform for learning English. Its product direction is between a structured course and an interactive language-learning trainer.

Main product areas:
- **Roadmap** — a predefined English curriculum from CEFR A1 to C1.
- **Topics and lessons** — topics contain ordered lessons; lessons contain explanations, grammar rules and examples.
- **Exercises** — interactive practice attached to individual lessons.
- **AI Tutor** — a separate assistant for explanations, conversation practice and questions.
- **Account** — user profile and learning statistics.

The curriculum is predefined and maintained as application content. **AI must not generate the whole Roadmap.** AI functionality belongs in the separate tutor experience and may later offer revision recommendations.

## 2. Current project state

The repository currently contains a frontend prototype. The app uses local TypeScript data and mock progress. There is no production backend, database, real authentication, persistent user progress, or AI integration yet.

Implemented:
- React application entry point and React Router configuration.
- Shared application layout with sidebar navigation.
- Roadmap page with level, topic and lesson progress derived from mock data.
- Topic page listing lessons.
- Lesson page rendering typed lesson content blocks.
- Exercise page selecting questions dynamically by lesson ID, supporting multiple-choice and fill-in-the-blanks, answer feedback, score and result screen.
- Login and registration page UI.
- Basic registration service placeholder.

Partially implemented / prototype only:
- Roadmap data structure covers A1–C1, but much of the lesson content is empty.
- Only the `present-simple` lesson currently has an exercise set (8 questions).
- Other lessons show an exercises-coming-soon state.
- Login and registration do not authenticate users.
- Progress is read from static mock data and is not updated or persisted by exercise completion.
- AI Tutor and Account are placeholder pages.

Do not describe placeholder functionality as implemented functionality.

## 3. Technology stack (verified from package.json)

- React 19
- TypeScript 6
- Vite 8
- React Router DOM 7
- CSS (page-level CSS files and global CSS variables)
- modern-normalize

Available scripts (run from `frontend/`):
- `npm run dev` — development server
- `npm run build` — TypeScript project build and Vite production build
- `npm run lint` — ESLint
- `npm run preview` — preview production build

React Query, Zustand, a backend framework, database client, form library and AI SDK are **not currently installed**. Do not assume they exist.

## 4. Repository layout

The repository root contains the documentation and the `frontend/` application.

Current frontend source structure:

```text
frontend/
  src/
    App.tsx
    main.tsx
    app/
      router.tsx
    components/
      AppLayout/
        AppLayout.tsx
        AppLayout.css
    data/
      roadmap.ts
      learningData.ts
      mockProgress.ts
      exercises/
        lessons/
          lessonContent.ts
          presentSimple.ts
    pages/
      LandingPage/
      TopicPage/
      LessonPage/
      ExercisePage/
      LoginPage/
      RegisterPage/
      PlaceholderPage/
    services/
      authService.ts
    styles/
      globals.css
    types/
      learning.ts
```

Each page generally has its own folder and CSS file. Some pages currently have only a TSX file.

## 5. Routing

Routes are configured in `frontend/src/app/router.tsx` and rendered through `RouterProvider` in `App.tsx`.

| Route | Page | Current role |
|---|---|---|
| `/` | LandingPage | Roadmap / current learning level |
| `/topic/:topicId` | TopicPage | Lessons in a topic |
| `/lesson/:lessonId` | LessonPage | Lesson content |
| `/exercise/:lessonId` | ExercisePage | Exercises for a lesson |
| `/ai` | PlaceholderPage | Future AI Tutor |
| `/account` | PlaceholderPage | Future account |
| `/login` | LoginPage | Login UI only |
| `/register` | RegisterPage | Registration UI only |

The learning pages are nested inside `AppLayout`; login and register are standalone routes.

## 6. Data model

Core types are in `frontend/src/types/learning.ts`.

- `Level` — CEFR level with code, title, description and order.
- `Topic` — belongs to a level through `levelId`.
- `Lesson` — belongs to a topic through `topicId`; includes estimated time and typed content blocks.
- `ExerciseQuestion` — belongs to a lesson through `lessonId`; currently discriminated into `multiple-choice` and `fill-in-the-blanks`.
- `UserProgress` — mock progress including current level, streak, coins, completed count and per-lesson progress.
- `UserProfile` — basic user profile type.
- `LearningData` — levels, topics, lessons and exercises.

Data sources:
- `data/roadmap.ts` defines levels, topic seeds, topics and lessons. Its exported `learningData.exercises` is currently an empty array.
- `data/learningData.ts` combines roadmap data with exercise question arrays. ExercisePage imports from this aggregator.
- `data/mockProgress.ts` contains the current hardcoded sample user progress.
- `data/exercises/lessons/presentSimple.ts` contains the current 8 exercise questions.
- `data/exercises/lessons/lessonContent.ts` contains lesson content. Its current location is historical; avoid moving it without a deliberate refactor.

**Important consistency note:** LandingPage, TopicPage and LessonPage currently import `learningData` from `data/roadmap.ts`; ExercisePage imports the combined `learningData` from `data/learningData.ts`. Be aware of this distinction when adding or reorganizing data.

## 7. Existing implementation behavior

### Roadmap
- Uses `mockProgress.currentLevelId` to select the current level.
- Calculates level and topic completion from `lessonProgress`.
- Topic availability is currently derived from the completion state of preceding topics.
- Displays a Continue Learning link based on the first unfinished lesson in the active topic.

### Topic and lesson pages
- Resolve route parameters with `useParams`.
- Show not-found states for unknown IDs.
- Lesson content is rendered according to the `LessonContentBlock` discriminated union.
- Lessons without content display a coming-soon state.

### Exercises
- Filters questions by `lessonId` and sorts by `order`.
- Supports multiple choice and fill-in-the-blanks.
- Normalizes answers by trimming whitespace and converting to lowercase.
- Displays feedback and explanation after checking an answer.
- Calculates a score and displays a result screen.
- Does not yet write the result into `mockProgress` or persistent storage.

## 8. Engineering conventions

Follow these conventions unless there is a clear, discussed reason to change them:
- Use TypeScript and preserve useful type safety.
- Use **arrow functions** for project functions and React components; avoid ordinary function declarations.
- Keep components reasonably focused. Extract reusable logic only when it improves clarity or avoids real duplication.
- Keep page styles in their page/component CSS files and shared design tokens in `styles/globals.css`.
- Reuse existing types and data structures instead of introducing duplicate models.
- Prefer simple architecture appropriate for a school project that aims to resemble a maintainable production application.
- Do not add dependencies just because they are popular. Explain why a dependency is needed.
- Preserve existing routes and user flows unless the task explicitly changes them.
- Handle unknown route IDs and empty data states.
- Do not silently change curriculum IDs: they are referenced across roadmap, lesson content, exercises and progress.

## 9. Product and architecture decisions

- The Roadmap is a curated, predefined A1–C1 curriculum, not AI-generated.
- AI Tutor is a separate feature.
- Build and validate the frontend with mock data before introducing backend complexity.
- Authentication must eventually be handled by a backend. Never store raw passwords.
- Never expose AI-provider API keys or other secrets in frontend code or Vite environment variables exposed to the browser.
- Future AI requests should go through the backend, with input validation, rate limiting, cost controls and protection against prompt injection.
- Progress should eventually be associated with an authenticated user and stored in a database.
- Do not introduce localStorage as a substitute for the planned account-backed progress system without discussing the trade-off first.

## 10. Instructions for AI coding assistants

Before making changes:
1. Read this file, `PROJECT_STATUS.md`, `ARCHITECTURE.md` and `ROADMAP.md`.
2. Inspect the actual source files relevant to the task. Documentation can become stale; source code is authoritative for current implementation.
3. Identify the files and data flows affected by the change.
4. Explain the proposed approach briefly before substantial refactors.
5. Make the smallest coherent change; do not rewrite unrelated files.
6. Preserve the arrow-function convention and current TypeScript types.
7. Run `npm run build` and `npm run lint` from `frontend/` when possible. Report commands that were not run; never claim they passed without running them.
8. Update the documentation if architecture, routes, data models, product decisions or implementation status changes.
9. Do not claim a feature is complete merely because its page exists.

When asked to continue development, first summarize the relevant current state and propose the next small implementation step. Avoid generating the entire application in one response.
