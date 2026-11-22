# Product and Engineering Roadmap

This roadmap describes the intended order of development. It is a plan, not a statement that these features already exist.

## Guiding principle

Build a coherent, understandable foundation before adding infrastructure. Complete the frontend learning experience with mock data first, then introduce backend persistence and external integrations.

## Phase 1 — Frontend foundation

- [x] React + TypeScript + Vite setup
- [x] React Router configuration
- [x] Shared application layout
- [x] Typed learning domain models
- [x] A1–C1 roadmap structure
- [x] Topic page
- [x] Lesson page
- [x] Dynamic exercise page
- [x] Route page-level curriculum reads through `curriculumService`
- [x] Route profile and progress reads/writes through feature services
- [x] Keep mock data behind service boundaries so API implementations can replace them
- [x] Add a mock progress service with a clear API
- [x] Update progress after exercise completion
- [x] Show updated progress on Roadmap and Topic pages
- [x] Define retry and best-score behavior
- [ ] Add automated tests for progress update rules
- [ ] Add basic automated tests for progress and answer-checking logic

## Phase 2 — Learning content and user flow

- [ ] Complete A1 learning content to a consistent quality level
- [ ] Add exercises for lessons incrementally
- [ ] Build onboarding flow
- [x] Build initial Placement Test with 20 A1–C1 questions and deterministic scoring
- [x] Show placement result and set the in-memory starting level
- [ ] Expand and validate the question bank; add automated scoring tests
- [ ] Build registration → onboarding → placement → roadmap flow
- [ ] Add empty, loading and error states where relevant
- [ ] Review responsive layout and accessibility

## Phase 3 — Account and roadmap experience

- [x] Build initial Account page UI
- [x] Display mock learning statistics
- [x] Separate current learning level from highest verified level
- [x] Restrict current-level selection to the verified range
- [x] Show all CEFR levels on Roadmap with locked-level previews
- [ ] Add clear distinction between previewing a locked curriculum and accessing its lessons
- [ ] Define streak and coin rules before implementing them
- [ ] Connect account UI to the future user/progress data model

## Phase 4 — Backend and database

- [ ] Select backend framework based on project needs and maintainability
- [ ] Define and version API contract before wiring frontend requests
- [ ] Add shared HTTP client and normalized API error handling
- [ ] Design relational database schema
- [ ] Add migrations and seed data
- [ ] Implement registration and login securely
- [ ] Add authentication and authorization middleware
- [ ] Add curriculum read endpoints
- [ ] Add progress read/write endpoints
- [ ] Replace mock service implementations with API-backed implementations
- [ ] Validate inputs and handle API errors consistently

## Phase 5 — AI Tutor

- [ ] Define tutor use cases and supported modes
- [ ] Design backend-only AI provider integration
- [ ] Keep provider-specific code behind a replaceable service interface
- [ ] Add prompt construction and context limits
- [ ] Add input validation, rate limiting and usage/cost limits
- [ ] Treat user content as untrusted and mitigate prompt injection
- [ ] Build chat UI and conversation lifecycle
- [ ] Evaluate answer quality and failure behavior

## Phase 6 — Quality and delivery

- [ ] Add unit and integration tests for important flows
- [ ] Add production build checks to GitHub Actions
- [ ] Configure environment variables and secret management
- [ ] Deploy frontend and backend
- [ ] Configure database hosting and backups
- [ ] Write setup and deployment documentation
- [ ] Prepare a school-project demonstration flow

## Current next step

1. Verify Roadmap level tabs and locked-level previews in the browser; run build and lint checks.
2. Add automated tests for placement scoring and level-selection rules.
3. Standardize curriculum, profile and progress access behind feature services (authentication remains a placeholder).
4. Review and agree on the draft API contract before implementing backend endpoints.
5. Expand A1 learning content with Russian explanations and English examples plus translations.
6. Build onboarding from registration through placement test to the recommended Roadmap level.

The verified maximum, current learning level and lesson progress currently live in React Context only. They reset on reload and will later need to be associated with the authenticated user on the backend.
