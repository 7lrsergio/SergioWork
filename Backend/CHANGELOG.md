# Changelog

## Changes made

### 1. Imported profile.js
Added `import profile from "./profile.js"` to the top of server.js.

profile.js has all of my real info (projects, resume, skills, availability, contact)
but it was never being loaded into the server — so the bot had no idea what to say.

### 2. Updated the system prompt
The old system prompt just told the AI to "answer questions about Sergio"
but didn't actually give it any information about me.

Updated it to inject the full profile object as JSON so the AI has something
real to pull from when someone asks about my projects, experience, availability, etc.

---

### 3. Frontend/script2.js — environment-aware API URL
**File:** `Frontend/script2.js`
**Line:** 179 (inserted before the try block inside `sendMessage`)

Before:
```js
const res = await fetch("http://localhost:3001/api/chat", {
```

After:
```js
const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:3001/api/chat"
  : "https://YOUR-DEPLOYED-BACKEND-URL/api/chat";

const res = await fetch(API_URL, {
```

Why: The URL was hardcoded to localhost — this means it only works on your machine.
Visitors on the live site would silently fail because their browser would try to reach
your local machine and get nothing back. This change auto-detects the environment and
switches to the deployed backend URL when running on the real site.

TODO: Once the backend is deployed, replace `YOUR-DEPLOYED-BACKEND-URL` with the real URL.

---

### 4. Backend/server.js — replace placeholder domain in allowedOrigins
**File:** `Backend/server.js`
**Lines:** 16–17

Before:
```js
"https://yourdomain.com",
"https://www.yourdomain.com",
```

After:
```js
"https://sergiolopez.work",
"https://www.sergiolopez.work",
```

Why: The placeholder domain was never going to match any real request. CORS would
block every request from the live portfolio. Replaced with the actual domain.

---

### 5. Frontend/index.html — project card content restructured (Problem / Solution / Tech / Impact)
**File:** `Frontend/index.html`

All project cards updated to follow a consistent framework:
- data-desc → Problem + Solution
- data-tools → Tech + Impact

Cards updated:
- SLANDS
- Casa Döner — Restaurant Website & Online Ordering
- Barbershop — Online Booking System
- Weather App — Personal Planning Tool

Card added:
- Pokémon Game Engine — Java (new card, no video, placed before "Next Project")

---

### 6. Preview panel label formatting
**Files:** `Frontend/preview.js`, `Frontend/styles.css`

preview.js — added `formatLabels()` function that wraps "Problem —", "Solution —", "Tech —", "Impact —" in `<span class="preview-label">`. Switched `descEl` and `toolsEl` from `.textContent` to `.innerHTML` so the spans render.

styles.css — added `.preview-label` rule: `color: #FFF8E8`, `font-style: normal`, `font-weight: 600` so the labels appear bright ivory against the dimmer body text (`#d7d1c1`) and tools text (`#aaa`), and are not italic like the surrounding tools text.
