# Swenetix MERN learning scaffold

Prep repo for the **Swenetix hiring hackathon** (plain JS MERN).

This repo is a **learning scaffold**, not a finished app. Empty folders + docs + Cursor rules. **You** write the code, section by section.

## What is here

| Path | Purpose |
|------|---------|
| `ROADMAP.md` | Ordered build plan for a mini Instagram-style app (~3–4 hours) |
| `.cursor/rules/` | Rules so Cursor coaches step-by-step instead of generating the whole app |
| `server/models|controllers|routes|middleware/` | Empty folders — your Express layout |
| `client/src/` | Empty — your React (Vite) client |
| `.env.example` | Required env var names (no secrets) |

## Auth decision (locked)

**JWT** (Bearer token). Do not switch to sessions mid-build.

## How to use this with Cursor

1. Open **this repo** as the workspace.
2. Open `ROADMAP.md`. Start at **Section 0**.
3. Work **one section at a time**. Tell Cursor which section you are on.
4. Ask for explanation first, then implement the critical paths yourself:
   - password hash + JWT sign/verify
   - `authMiddleware`
   - post create using `req.user` (not body `authorId`)
5. Cursor may help with boilerplate UI and wiring. It must **not** one-prompt the entire app.
6. After each section, tick the **Done when** checklist in `ROADMAP.md` before moving on.

### Example prompts

- “Explain Section 1 auth flow. Do not write the full files yet.”
- “I wrote `authMiddleware.js` — review it and tell me what is wrong. Do not rewrite the whole server.”
- “Scaffold only the Vite client login form; I will wire the API call.”

## Local setup (after you add code)

```bash
# server
cd server && npm install && cp ../.env.example .env   # then edit .env
node server.js

# client (separate terminal)
cd client && npm install && npm run dev
```

## Out of scope

DMs, likes/follow graphs, stories, image upload pipelines, TypeScript, fancy UI.

## Hackathon target demo

Register → login → create post (caption + image URL) → feed → profile (own posts) → logout.
