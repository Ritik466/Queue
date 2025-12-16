# Contributing to QUEUE

Thank you for contributing to QUEUE.

This project follows professional development practices to ensure stability and scalability.

---

## Branch Rules

- `main` → production-ready code only
- `dev` → integration branch
- Feature branches:
  - `frontend/<feature-name>`
  - `backend/<feature-name>`
  - `cloud/<feature-name>`
  - `docs/<feature-name>`

---

## Commit Message Format

- Examples:
  - `feat` : add appointment booking flow
  - `fix` : resolve double booking issue
  - `docs`: update edge case documentation

---

## Pull Request Rules

- Always raise PR against `dev`
- One feature per PR
- PR description must include:
  - What was implemented
  - Edge cases handled
  - Screenshots (for frontend)

---

## Code Quality

- No hard-coded values
- Handle all error states
- Loading states are mandatory
- Code must be readable and commented where needed
