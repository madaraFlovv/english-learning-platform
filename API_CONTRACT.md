# Englishly API Contract — Draft

> Planning document only. No backend endpoints are implemented yet. Endpoint names and payloads must be reviewed before backend development.

## Principles

- Base path: `/api/v1`.
- JSON request and response bodies unless an endpoint explicitly uses another format.
- The backend is authoritative for identity, permissions, placement results and persisted progress.
- IDs are stable opaque strings. Frontend code must not assume database implementation details.
- Never return passwords, password hashes, session secrets or provider API keys.
- Validate every request on the server. TypeScript types in the browser are not security validation.

## Authentication and session

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | Create an account |
| POST | `/auth/login` | Start a session |
| POST | `/auth/logout` | End the current session |
| GET | `/auth/me` | Return the current authenticated user and safe profile fields |

For a browser application, prefer a server-managed session in an HttpOnly, Secure, SameSite cookie where practical. The exact CSRF strategy depends on the selected backend and deployment topology.

## Profile

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/users/me` | Read the current user's profile |
| PATCH | `/users/me` | Update allowed profile fields |

Only allowlisted fields such as display name and avatar URL should be editable here. Email changes should use a separate verified flow if implemented.

## Curriculum

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/curriculum` | Read levels and topic outline |
| GET | `/levels/:levelId` | Read one level and its topics |
| GET | `/topics/:topicId` | Read topic and lesson outline |
| GET | `/lessons/:lessonId` | Read lesson content |
| GET | `/lessons/:lessonId/exercises` | Read exercise questions |

Curriculum is curated application content. The AI tutor must not generate or replace the canonical curriculum.

## Modules and module assessments (planned extension)

The current curriculum endpoints describe levels, topics and lessons. The product roadmap now plans a level → module → lesson → exercise hierarchy. Before implementing this feature, revise the curriculum contract and data model to include:

| Method | Proposed endpoint | Purpose |
|---|---|---|
| GET | /modules/:moduleId | Read a module and its lesson outline |
| GET | /modules/:moduleId/assessment | Read the module assessment |
| POST | /modules/:moduleId/assessment-attempts | Submit an assessment attempt; the server calculates the result and unlock decision |
| GET | /users/me/module-progress | Read the current user's module completion and assessment status |

These are proposals, not implemented or finalized endpoints. A successful assessment may confirm prior knowledge and unlock the next module without requiring lesson completion. The backend must validate the attempt and record whether the module was completed through lessons or passed directly by assessment.
## Progress and placement

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/users/me/progress` | Read current user's learning progress |
| PUT | `/users/me/progress/lessons/:lessonId` | Submit/update a lesson result |
| POST | `/placement-tests/attempts` | Submit answers and create a placement attempt |
| GET | `/users/me/placement-history` | Read the user's previous placement results |

The server must verify that the lesson exists and belongs to the curriculum. It should calculate or validate score and completion rules rather than trusting a client-supplied `completed` flag. The highest verified level must never be lowered by a worse retake.

## Consistent error shape

Proposed format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data.",
    "details": []
  }
}
```

The frontend should map known error codes to user-friendly messages and avoid exposing internal stack traces.

## Security requirements

- Hash passwords with a well-maintained password-hashing library on the server; never log passwords.
- Enforce authentication and ownership checks on every private endpoint.
- Use HTTPS in deployed environments.
- Apply rate limits to authentication and AI endpoints.
- Validate input shape, length and allowed values on the server.
- Avoid returning private user fields that the current user does not need.
- Keep AI provider credentials server-side and apply usage limits.
- Treat lesson answers and AI chat messages as untrusted input.
- Add audit-safe operational logs without credentials, session cookies or unnecessary personal data.

## Open decisions before implementation

- Backend framework and hosting.
- Database engine and schema/migrations.
- Session storage and CSRF protection details.
- Whether curriculum is served from the database or bundled/managed as versioned content.
- Exact progress attempt history and streak calculation rules.
- Pagination/versioning needs as the curriculum and user base grow.
