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
- [ ] Review and standardize data access
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

## Phase 3 — Account experience

- [ ] Build Account page UI
- [ ] Display profile and learning statistics
- [ ] Define streak and coin rules before implementing them
- [ ] Connect account UI to the future user/progress data model

## Phase 4 — Backend and database

- [ ] Select backend framework based on project needs and maintainability
- [ ] Define API contract before wiring frontend requests
- [ ] Design relational database schema
- [ ] Add migrations and seed data
- [ ] Implement registration and login securely
- [ ] Add authentication and authorization middleware
- [ ] Add curriculum read endpoints
- [ ] Add progress read/write endpoints
- [ ] Replace mock services with API-backed services
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

1. Verify the new Placement Test in the browser and run the production build and lint checks.
2. Add automated tests for the deterministic placement scoring service.
3. Improve question quality and coverage, then add more skill types only when there is suitable content.
4. Build onboarding so a new user completes registration, takes the placement test and lands on the recommended Roadmap level.
5. Expand A1 learning content with Russian explanations and English examples plus translations.
6. Revisit subtle UI animation and typewriter effects after the core learning flow is stable.

The placement result currently updates mock progress in React Context only. It resets on reload and will later need to be associated with the authenticated user on the backend.
