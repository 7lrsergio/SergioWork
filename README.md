# Sergio's portfolio

The main site is `index.html`; `index_nav.html` is an alternate page using the same scripts and optimized video assets.

## Local preview

Run `python3 -m http.server 5173` in the repository and open `http://localhost:5173`.
Run `cd Backend && npm install && npm start` in another terminal. The backend needs `OPENAI_API_KEY` in its local `.env` or hosting environment. Never publish the backend folder through a static server on the internet. The frontend uses port 3001 locally and the existing Render backend in production.

## Video assets

`img/optimized/` contains six 24 fps H.264 demos, scaled to at most 960 pixels wide, with no audio and MP4 fast-start metadata. Original recordings are preserved in `img/`. The optimized videos total 6.65 MB versus 66.80 MB originally: 90% smaller. JPEG posters show while playback starts. No video downloads at initial page load; a source is assigned only when a project is previewed. Short hover delays avoid accidental downloads; revisiting the same demo does not reset its source. Reduced-motion and data-saving visitors use the native play control. Clicking or using Enter/Space keeps a preview open until closed; Escape also closes it.

## Chatbot

Edit facts in `Backend/profile.js` and assistant behavior in `Backend/prompt.js`. The prompt explains projects and gives evidence-based answers to hiring questions while accurately describing Sergio as a student and aspiring engineer. It distinguishes documented skills from unknown qualifications, work in progress from completed work, and self-reported results from independently verified measurements. The prompt structure follows https://developers.openai.com/api/docs/guides/prompt-engineering.

The browser retains up to four successful exchanges in memory for follow-up questions; refresh clears them. The server validates message sizes, history size, and alternating user/assistant roles. History provides context, not verified qualifications. Replies appear immediately when received, without the previous typewriter delay.

Run `cd Backend && npm test` for request-validation tests. Live model response testing is pending explicit approval to send the existing profile and test questions to OpenAI; browser chat verification used simulated replies.

## Verification and deployment

Local Chromium checks verified zero initial video requests, playback of all six videos, follow-up chat payloads, reduced-motion playback behavior, and no JavaScript page errors. Screens at 390, 768, and 1440 pixels showed no horizontal overflow. All six MP4 files were checked for fast-start metadata. These checks do not measure production network latency or cover physical mobile devices.

Deploy static files including `img/optimized/`, and deploy the updated Backend separately to Render. Local edits do not change the live site. The `.env` file remains tracked in the existing repository despite the ignore rule; do not include it in a public deployment.
