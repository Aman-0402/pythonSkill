# Agent.md — PyJourney (Python learning site)

Guide for anyone (human or AI agent) working in this repo. It records what the project is, how it is built, the decisions made so far, and the traps already hit.

- **Repo:** https://github.com/Aman-0402/pythonSkill (branch `main`)
- **Live site:** https://aman-0402.github.io/pythonSkill/ (GitHub Pages, auto-deploys on every push to `main`)
- **Local dev URL:** http://localhost:5173/

## Working rules (set by the owner, always follow)

1. **Always update this file.** Every change to the project must be reflected in Agent.md (file map, behaviour, history, gotchas) in the same commit.
2. **Commit and push to GitHub after every change**, to `main` at https://github.com/Aman-0402/pythonSkill. Pushing redeploys the live site.
3. **No co-author lines.** Commit messages contain no `Co-Authored-By` trailer and no tool attribution.
4. **Suggest improvements.** When there is a better idea, say so briefly alongside the work, and let the owner decide.
5. Run `npx tsc -b` before committing.

## What this is

A small learning website for Python beginners. Three screens:

1. **Landing (`/`)** — dark, premium page: a flat 2D "Python" title, a green 3D snake wandering randomly in the background, floating data-analyst icons, and a glass "Start your journey" button. No mouse interaction.
2. **Contents (`/contents`)** — white page with a grid of topic cards. Today there is one card: "Introduction to Python and Setup".
3. **Notes (`/contents/<slug>`)** — the lesson, shown as full-screen scroll-snapping slides, one per sub-topic, each with its own colour.

The CLAUDE.md in the parent `D:\code\GITHUB` folder describes a different project (Innolance LMS). Ignore it here: this repo has no Express, Drizzle, Tailwind, shadcn or Wouter.

## Tech stack

| Area | Choice |
|---|---|
| Runtime | Node 22, ESM |
| UI | React 19, TypeScript 7 |
| Build | Vite 8 |
| 3D | three.js 0.186 (plain three, no react-three-fiber) |
| Routing | Tiny hand-written router in `src/router.tsx` (no dependency) |
| Styling | One plain CSS file, `src/index.css`. No Tailwind, no CSS-in-JS |
| Fonts | Google Fonts: Bricolage Grotesque (headings), Instrument Sans (body), JetBrains Mono (code) |
| Hosting | GitHub Pages via GitHub Actions |

## Commands

```bash
npm run dev       # dev server on :5173
npm run build     # tsc -b && vite build  -> dist/
npm run preview   # serve the production build
npm run lint      # oxlint
npx tsc -b        # typecheck only (run after every change)
```

## File map

```
index.html                  Fonts, title "Learn Python", mounts #root
vite.config.ts              base = '/pythonSkill/' only when GITHUB_ACTIONS is set
public/
  favicon.svg               Python-style logo
src/
  main.tsx                  React entry
  App.tsx                   Picks a page from the URL path
  router.tsx                usePath, navigate, <Link>, base-path aware
  Landing.tsx               Scene + FloatingIcons + flat 2D "Python" title + CTA link to /contents
  Scene.tsx                 three.js: green snake, lights, dust (no text, no mouse input)
  FloatingIcons.tsx         10 floating data-analyst icon tiles
  Contents.tsx              Topic grid, built from `lessons`
  Lesson.tsx                Notes page: block renderer, toBands(), sizeOf(), slides UI
  content.ts                ALL lesson text and its types (the only place to edit content)
  index.css                 All styles
.github/workflows/deploy.yml   Build and deploy to Pages
```

## Routing

`App.tsx` strips trailing slashes, then:

- `/contents` -> `Contents`
- `/contents/<slug>` -> `Lesson` (slug must match a `lessons[].slug`; otherwise a "Topic not found" page)
- anything else -> `Landing`

`router.tsx` keeps a `BASE` (`''` locally, `/pythonSkill` on Pages) taken from `import.meta.env.BASE_URL`. `<Link href="/contents">` always takes an app-relative path; the base is added inside. Use `<Link>` for every internal navigation so the base path stays correct. Plain `#anchor` hrefs are fine.

## Landing page (Scene.tsx)

- Renderer is transparent; the page background is CSS (navy gradient + vignette via `body::after`).
- **Title:** the "Python" heading is plain HTML/CSS (`.hero-title`): flat 2D, white-to-light-blue gradient text with a soft blue glow. It was a 3D chrome text earlier; it was removed on request, along with all mouse interaction. The page ignores the pointer.
- **Lighting:** a `RoomEnvironment` reflection map plus a warm key light, a blue rim light and a green point light, used for the snake's glossy look.
- **Snake:** 46 sphere segments, each following the one before it at a fixed spacing. The head's turn rate is a sum of sines (smooth, random-looking); near the screen edge it steers back to the centre. Colour runs bright green (`#16c455`) at the head to dark green (`#0b5a26`) at the tail, with a darker band every 4th segment. Sits behind the text (z around -3).
- **Reduced motion:** snake and dust stop; scene renders once.
- The scene is mounted only on the landing page and disposes its renderer, geometries and listeners on unmount.

## Floating icons

`FloatingIcons.tsx` renders 10 glass tiles with inline SVG icons (bar chart, line chart, pie chart, database, table, search, scatter plot, filter, SQL, sum). Positions, tilt, speed and delay come from `.floater:nth-child(n)` rules in the CSS. Three are tinted green. Animation is off under `prefers-reduced-motion`.

## Lesson content model (content.ts)

A lesson is `{ slug, title, summary, sections[] }`. A section is `{ id, title, blocks[] }`. Block types:

| type | fields |
|---|---|
| `p` | `text` |
| `h3` | `text` |
| `ul`, `ol` | `items[]` |
| `code` | `code`, optional `output`, optional `label` |
| `note` | `tone` (`tip` or `warn`), `title`, `text` |
| `table` | `head[]`, `rows[][]` |

Inline markup inside `text`, list items and table cells: `` `code` `` and `**bold**`. Callout `title`s are plain text (no markup).

Use `String.raw` (the `raw` helper at the top of the file) for code samples so `\n` stays a literal backslash-n.

### Adding a topic

Add one object to the `lessons` array in `content.ts`. It appears on the Contents page automatically and is reachable at `/contents/<slug>`.

### Current lesson

"Introduction to Python and Setup" has 8 sections: What is Python?, History, Installation, Ways to run Python, First programs, Python as a calculator, Practice, Homework and wrap-up. All timings from the original notes were deliberately removed. Output samples, the history timeline table and the operator table were added on top of the original text. Key phrases are bolded.

## Slides (Lesson.tsx)

- `toBands()` turns sections into slides: the content before the first `h3` is one slide titled with the section name; every `h3` starts a new slide (its title is the slide title, the section name becomes a small label). The 8 sections currently produce 20 slides.
- A title slide comes first and fills the screen (`min-height: 100vh`) with a "Start reading" button.
- `html.snap-page` (added while the notes page is mounted) turns on `scroll-snap-type: y mandatory`; each slide is `min-height: 100vh` with `scroll-snap-align: start`.
- Slide content fades and rises in via an `IntersectionObserver` (`.in-view`). A second observer, watching the middle line of the screen, drives the active dot and the "n / 20" counter. This works even for slides taller than the screen.
- Right-edge dots jump to a slide; they are hidden under 900px.
- `sizeOf()` picks `data-size` = `xl`, `l` or `m` from how much text a slide has. Short slides get bigger type (`--scale` 1.5 / 1.2 / 1) so they fill the screen. Slides containing code or a table always stay `m`.
- Each slide gets one of 8 soft background colours with a matching accent (blue, green, orange, purple, pink, teal, amber, indigo), cycling with `.band:nth-of-type(8n + k)`. The accent colours the eyebrow, title bar, bullets, bold text, table headers, code-block header and callout borders.
- Bold text is the slide's accent colour at heavier weight, with no highlight strip (the strip was tried and rejected).

## Styling notes

- Landing page palette: navy `#060d1a` to `#08122a`, chrome white, green accent `#2ee38a`, snake greens. Yellow appears only in the favicon.
- Contents and notes pages are light: white page, dark navy text.
- Type scales with the screen using `clamp()` with `vw` and `vh` terms. Sizes are large on purpose; the user repeatedly asked for bigger fonts and less empty space.
- `index.css` is layered: later blocks intentionally override earlier ones (for example "section bands", "fill the slide", "short slides"). When changing a style, search for every rule that targets the same selector and edit the last one, or the change will appear to do nothing.
- Respect `prefers-reduced-motion` for any new animation.
- Avoid inline `style` props; use classes or `data-` attributes (as `data-size` does).

## Deployment (GitHub Pages)

- `.github/workflows/deploy.yml` runs on every push to `main`: `npm ci`, `npm run build`, copy `dist/index.html` to `dist/404.html`, upload, deploy.
- The `404.html` copy is the SPA fallback. GitHub Pages answers deep links such as `/contents/...` with HTTP 404 but serves the app, so browsers show the page normally.
- `vite.config.ts` sets `base: '/pythonSkill/'` only when `GITHUB_ACTIONS` is set, so local dev stays at `/`.
- Pages source is set to "GitHub Actions" in the repo settings.
- To test the production base path locally: `GITHUB_ACTIONS=true npm run build`, then check that paths in `dist/index.html` start with `/pythonSkill/`.

## History of what was built (in order)

1. Scaffolded Vite + React + TypeScript in this folder (copied from a temp scaffold so the existing `.vscode` was kept).
2. Replaced the demo with a Python landing page, then reduced it to just a centred "Python" word and a "Start your journey" button.
3. Made the word 3D (three.js) with a snake moving randomly behind it; later restyled for a premium look (navy gradient, chrome text, glass button) and made the snake green.
4. Added floating data-analyst icons.
5. Added the Contents page (grid, one topic) and a small custom router, because the network was down and `wouter` could not be installed.
6. Added the notes page from the pasted lesson, without timings, then iterated: removed the "On this page" menu, switched to a white, 1450px-wide layout, bigger fonts, more colour.
7. Rebuilt the notes as per-sub-topic colour bands, then as full-screen scroll-snap slides with dots and a counter; added size-by-content scaling and bold key phrases; replaced the bold highlight strip with accent-coloured bold.
8. Pushed to GitHub and set up GitHub Pages with the base-path-aware router and the 404 fallback.
9. Landing page edit: replaced the 3D chrome "Python" text with a flat 2D title and removed all mouse interaction (snake, icons and button kept). Deleted the now-unused 3D font file.

## Gotchas and lessons learned

- **Base path:** any file loaded at runtime from `public/` must use `import.meta.env.BASE_URL + 'path'`, never a bare `/path`, or it breaks on GitHub Pages.
- **three.js fonts:** `three@0.186` no longer ships `examples/fonts`. If 3D text is ever needed again, download a typeface JSON (for example from three r160) into `public/`.
- **Shell escaping:** creating files with Bash heredocs or `node -e` mangled template literals (`${...}` was expanded by the shell) and regex backslashes. Write source files with the editor/Write tool instead; use shell only for simple commands.
- **No network at times:** `npm install` can fail with `ENOTFOUND registry.npmjs.org`. Prefer not adding dependencies for small things.
- **Stale browser view:** after large CSS or dependency changes the dev page can show an old version; hard-refresh with Ctrl+Shift+R.
- **Tall slides:** with `scroll-snap-type: mandatory`, a slide taller than the screen scrolls inside itself before snapping on. Keep slide content reasonably short, or split it with an `h3`.
- **Line endings:** git warns that LF will become CRLF on Windows. This is harmless.
- **Typecheck:** run `npx tsc -b` after every change; it has been clean throughout.

## Open items and ideas

- The "Start your journey" button leads to Contents. Topic cards open notes. There is only one topic; add more in `content.ts`.
- Not yet done: previous/next buttons or arrow-key navigation between slides, a progress bar, a quiz or "try it" code runner, a per-slide share link (slides already have anchor ids, e.g. `#installation-windows`).
- The JS bundle is about 820 kB (mostly three.js). Code-splitting the landing scene with a dynamic `import()` would speed up the Contents and notes pages.
- The brand name "PyJourney" and all copy were written by the assistant; change them freely.
