# Local Changes

- Refactored the whole backend for improved structure and maintainability.
- Updated developer documentation with clear instructions for setup, from cloning the repository to contributing.
- Removed Google authentication and Outlook authentication from both backend and frontend.
- Performed code cleanup for the canvas in backend (frontend cleanup still pending).
- Updated Docker and docker-compose.yml files. Note: frontend has issues running inside the container, which will be resolved after AI/ML and frontend changes are completed.
- Updated APIs:
  - Delete User → `DELETE /user/{user_id}`
  - Delete Session → `DELETE /delete/{session_id}`
  These now ensure proper deletion of users and sessions.

**To-Dos:**
- Keep the codebase up to date with `insight-agents`.
- Resolve frontend Docker container issue.
- Complete frontend canvas cleanup.

**Exclusions:**
- From AI/ML, Backend, and Frontend → important features like Deep Research, Canvas, etc., have to be excluded