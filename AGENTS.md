# Instructions for AI coding agents

Before editing this repository, read:
- `PROJECT_CONTEXT.md`
- `PROJECT_STATUS.md`
- `ARCHITECTURE.md`
- `ROADMAP.md`

Then inspect the actual source files relevant to the requested task. Source code is authoritative if documentation and code disagree.

## Non-negotiable project conventions

- This is the Englishly school project. Help maintain and extend the existing application; do not generate a replacement project.
- Use TypeScript and preserve type safety.
- Use CSS Modules for page/component styles. Shared colors and theme tokens belong in the global design-token files.
- Use arrow functions for functions and React components. Do not introduce ordinary function declarations.
- Do not rewrite unrelated files or perform broad refactors without explaining the need.
- Preserve route paths and existing domain IDs unless the task explicitly requires changing them.
- Do not invent features, API endpoints, database tables or installed dependencies.
- The current application is a frontend prototype using local data and mock progress. Do not claim it has real authentication, persistence, backend or AI.
- Never expose private API keys or secrets in client-side code.
- Keep the predefined A1–C1 curriculum separate from AI Tutor functionality. AI does not generate the whole Roadmap.

## Workflow

1. Summarize the relevant current implementation.
2. Explain the smallest reasonable implementation plan.
3. Make focused changes.
4. Run `npm run build` and `npm run lint` from `frontend/` when possible.
5. Report exactly what changed and which checks were actually run.
6. Update project documentation when implementation status or architecture changes.
7. Do not silently replace mock data with browser storage or introduce new libraries.


## Learning levels and Account

- `UserProgress.currentLevelId` is the user's chosen learning level; `highestVerifiedLevelId` is the maximum level confirmed by the placement test.
- Do not merge these concepts or overwrite the user's current choice when a retake produces a higher verified maximum.
- `setCurrentLevel` must reject levels above the verified maximum. Before a placement result exists, only the initial A1 level is available.
- Changing the current level must not delete or reset per-lesson progress.
- Account is currently a frontend prototype using mock progress; do not describe it as a real authenticated account.

## Placement Test

- The initial test uses `data/placementQuestions.ts` and `services/placementService.ts`; do not duplicate its scoring rules in the page.
- A CEFR band is passed at 75% correct, and the estimated level advances only through consecutive passed bands from A1 upward.
- Keep the result explicitly described as an indicative grammar/vocabulary estimate, not official CEFR certification.
- When changing the question bank or scoring rules, update `PROJECT_CONTEXT.md`, `PROJECT_STATUS.md`, `ARCHITECTURE.md` and `ROADMAP.md`.
