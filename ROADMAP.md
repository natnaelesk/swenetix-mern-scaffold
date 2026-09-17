# Mini Instagram — learning roadmap (3–4 hours)

**Stack:** plain JavaScript MERN (no TypeScript).  
**Auth choice:** JWT (Bearer token). Stick to JWT for the whole build — do not mix sessions.  
**Image rule:** store an image **URL string** on the post. No upload pipeline, no Cloudinary, no multer.

## Out of scope (do not build)

- DMs / messaging
- Likes graph, comments graph
- Follow / unfollow graph
- Stories, reels, explore algorithms
- Fancy UI polish (clean and usable is enough)

---

## Section 0 — Repo and env (15–20 min)

**Goal:** Empty app boots: Express listens, Mongo connects, React Vite client starts. No features yet.

**Files to touch:**
- `server/package.json`, `server/server.js`
- `server/.env` (local only; never commit)
- `client/` Vite React app (plain JS)
- Root or server `.env.example` with `PORT`, `MONGO_URI`, `JWT_SECRET`

**Done when:**
- [ ] `npm run` (or separate server/client scripts) starts without crash
- [ ] Mongo connection log appears
- [ ] Client loads a blank or placeholder page
- [ ] `.env` is gitignored; `.env.example` has no secrets

**Pitfalls:**
- Committing `.env` or hardcoding `JWT_SECRET`
- Mixing CommonJS/`require` and ESM/`import` without a plan — pick one style for the server and stay consistent
- Forgetting CORS so the React client cannot hit the API

---

## Section 1 — Auth (register / login / logout) (~60–75 min)

**Goal:** User can register, log in, get a JWT, and the client can store it and send it on later requests. Logout = clear token on the client (JWT has no server session to destroy).

**Files to touch:**
- `server/models/User.js` — username, email, passwordHash (never store plain password)
- `server/controllers/authController.js` — register, login
- `server/routes/authRoutes.js` — `POST /api/auth/register`, `POST /api/auth/login`
- `server/middleware/authMiddleware.js` — verify JWT, attach `req.user`
- Client: register/login forms; save token (e.g. `localStorage`); logout button clears token

**You implement by hand (critical paths):**
1. Password hash with bcrypt on register
2. `authMiddleware` that reads `Authorization: Bearer <token>`, verifies, sets `req.user`
3. Login that compares hash and signs JWT with `JWT_SECRET` + expiry

**Done when:**
- [ ] Register creates a user and does **not** return the password hash
- [ ] Login returns `{ token, user }` (user without password)
- [ ] Bad password / missing fields return clear 400/401 errors
- [ ] Protected test route (e.g. `GET /api/auth/me`) works only with a valid token
- [ ] Logout clears client token; next protected call fails until login again

**Pitfalls:**
- Returning `password` / `passwordHash` in JSON
- Putting secrets in the client bundle
- Forgetting `await` on mongoose / bcrypt
- JWT payload too fat (keep `id` / `username` only)

---

## Section 2 — Posts (create + feed) (~45–60 min)

**Goal:** Logged-in user creates a post (caption + image URL). Anyone logged in (or public — pick **logged-in required for create**, **list feed for authenticated users**) can see a chronological feed.

**Files to touch:**
- `server/models/Post.js` — `author` (ref User), `caption`, `imageUrl`, `createdAt`
- `server/controllers/postController.js` — create, list
- `server/routes/postRoutes.js` — `POST /api/posts`, `GET /api/posts`
- Client: create form + feed list

**You implement by hand:**
1. Create handler uses `req.user.id` from middleware — never trust a client-sent `authorId`
2. List query sorts by `createdAt` desc and populates author username

**Done when:**
- [ ] Create without token → 401
- [ ] Create with token → post appears with correct author
- [ ] Feed returns newest first with author username visible
- [ ] Empty caption or missing `imageUrl` rejected with validation error

**Pitfalls:**
- Accepting `author` from the request body
- No validation → empty spam posts
- Forgetting `populate` → feed shows only ObjectIds

---

## Section 3 — Profile (username + own posts) (~30–40 min)

**Goal:** Profile page shows a username and that user’s posts only.

**Files to touch:**
- `server/controllers/userController.js` or extend posts — `GET /api/users/:username` or `GET /api/users/:id/posts`
- Client: profile route/page

**Done when:**
- [ ] Visiting a profile shows username
- [ ] Only that user’s posts list there
- [ ] Unknown username → 404
- [ ] Own profile works after login (link from nav)

**Pitfalls:**
- Case-sensitive username mismatch (decide: store lowercase, query lowercase)
- Loading the whole user collection instead of filtering posts by author

---

## Section 4 — Protected write ops + polish (~20–30 min)

**Goal:** All mutations require JWT. Reads can stay auth-required for hackathon simplicity. Central error middleware. Env-based config.

**Files to touch:**
- Wire `authMiddleware` on every `POST`/`PUT`/`DELETE`
- `server/middleware/errorMiddleware.js` — central `(err, req, res, next)`
- Client: redirect to login when API returns 401

**Done when:**
- [ ] Every write route uses auth middleware
- [ ] Thrown errors become JSON `{ message }` with proper status (not HTML crash pages)
- [ ] `.env.example` documents all vars
- [ ] You can demo: register → login → create post → see feed → open profile → logout

**Pitfalls:**
- Protecting only some writes
- `console.log` only — no status codes
- Shipping with default `JWT_SECRET=secret`

---

## Suggested order of work (vertical slices)

1. Section 0 boot  
2. Section 1 auth end-to-end (API + minimal UI)  
3. Section 2 one create + feed  
4. Section 3 profile  
5. Section 4 tighten protection + errors  

Do **not** build all models first then all UI. Finish one slice before the next.

## Hackathon bar (good enough)

Env vars, input validation, JWT on mutations, central errors, plain JS, clear folder layout.  
Not: production Instagram, tests suite, Docker, CI, TypeScript.
