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
- [ ] Add a mock progress service/store with a clear API
- [ ] Update progress after exercise completion
- [ ] Show updated progress on Roadmap and Topic pages
- [ ] Define retry and best-score behavior
- [ ] Add basic automated tests for progress and answer-checking logic

## Phase 2 — Learning content and user flow

- [ ] Complete A1 learning content to a consistent quality level
- [ ] Add exercises for lessons incrementally
- [ ] Build onboarding flow
- [ ] Build Placement Test with a transparent, deterministic scoring model
- [ ] Show placement result and set the starting level
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

Complete the mock progress loop:
1. Agree on what counts as a completed lesson.
2. Introduce a small progress layer without localStorage or backend persistence for now.
3. Update progress after the exercise result.
4. Verify that Roadmap and Topic pages reflect the updated state.

Do not start the backend or AI integration before the frontend data flow and requirements are clear.
