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

1. **Landing (`/`)** — dark, premium page: a flat 2D "Python" title, a big green 3D snake that wanders on its own and chases the mouse cursor, floating Python data-science and analysis logos, and a glass "Start your journey" button. The snake is the only thing that reacts to the mouse.
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
  icons/*.svg               10 Python data-science logos (Devicon, MIT): pandas, python, numpy, tensorflow, matplotlib, scikitlearn, jupyter, pytorch, plotly, opencv
src/
  main.tsx                  React entry
  App.tsx                   Picks a page from the URL path
  router.tsx                usePath, navigate, <Link>, base-path aware
  Landing.tsx               Scene + FloatingIcons + flat 2D "Python" title + CTA link to /contents
  Scene.tsx                 three.js: green snake, lights, dust (snake follows the pointer; no 3D text)
  placement.ts              placeTile(): random on-screen spot for a logo tile
  FloatingIcons.tsx         10 floating Python data-science logo tiles (real SVG files)
  Contents.tsx              Topic grid, built from `lessons`
  Lesson.tsx                Notes page: block renderer, toBands(), sizeOf(), slides UI, arrow keys, Prev/Next buttons
  Art.tsx                   Picture under a slide title: drawn illustration (slides 1 and 2 only) or your own file from src/slides/
  Highlight.tsx             Tiny Python syntax colouring used by code blocks and illustrations
  slides/README.md          How to add your own slide pictures, plus every slide id
  TryIt.tsx                 Editable code box that runs Python in the browser (Pyodide)
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
- **Title:** the "Python" heading is plain HTML/CSS (`.hero-title`): flat 2D, white-to-light-blue gradient text with a soft blue glow. It was a 3D chrome text earlier; it was removed on request, along with all mouse interaction. The 3D title tilt was removed; the pointer now only steers the snake (see below).
- **Lighting:** a `RoomEnvironment` reflection map plus a warm key light, a blue rim light and a green point light, used for the snake's glossy look.
- **Snake:** the body is one `InstancedMesh` of 150 small overlapping spheres (spacing 0.15), so it reads as a smooth, scaly body instead of a chain of beads. Thickness comes from `radius(i)`: narrow neck, full belly, long tapering tail (max radius 0.85). Colouring is a diamond-back pattern set per instance: dark green saddles with pale-green edges on a green body, with slight random brightness per scale. The head wanders: its turn rate is a sum of sines (smooth, random-looking) and near the screen edge it steers back toward the centre; every segment follows the one in front at a fixed spacing. For **slithering**, each segment is pushed sideways along a travelling sine wave (amplitude grows toward the tail), applied only when rendering, not to the path. The **head** is a separate group: a flattened wedge skull plus snout, a dark stripe on top, golden eyes with slit pupils, and a red forked tongue that flicks out for a moment every couple of seconds. It is scaled 1.65x and faces the direction of travel. It slithers **in front of** the "Python" title but behind the button (see "Landing layers" below). **Mouse follow:** a `pointermove` listener on `window` stores the cursor (NDC). While the cursor moved within the last `IDLE_MS` (3.5 s) the head aims at it, projected onto the snake's plane: turn rate is clamped (about 3.6 rad/s) so it curves like a real snake, and speed scales with distance (2.5 to 8). After the cursor is idle it goes back to random wandering. **Eating logos:** `eatLogos()` projects a point just in front of the head (the mouth) to screen pixels and compares it with each `.floater` tile's `getBoundingClientRect()`. On contact the tile gets class `eaten` (CSS pop-and-vanish); after `EAT_RESPAWN_MS` (2.5 s) it gets class `back` (pops in again) and is safe from being eaten for another 1.5 s. Timers and classes are cleaned up on unmount. Reduced motion: no wander, no follow, no eating, no wave, no tongue flick.
- **Reduced motion:** snake and dust stop; scene renders once.
- The scene is mounted only on the landing page and disposes its renderer, geometries and listeners on unmount.

### Random logo placement

`placeTile()` in `src/placement.ts` sets inline `left`/`top` percentages on a tile: anywhere from 4 to 92% across and 6 to 90% down, except the middle band (x 26 to 74%, y 28 to 74%) where the title and button live, and not within about 11% across / 14% down of another tile (after 60 tries it accepts an overlap rather than loop forever). `FloatingIcons` calls it in a `useLayoutEffect` on mount, so every visit has a new layout and tiles never jump after first paint; it also randomises `--r` (tilt), `--dur` and `--delay`. When the snake eats a tile, the tile is re-placed with `placeTile()` just before it pops back, so it returns somewhere else. The fixed `left`/`top` values were removed from the CSS.

### Landing layers

The `.landing` container does not create a stacking context (`z-index: auto`) so its children can interleave with the 3D canvas: floating tiles and `.hero-title` at z-index 1, the three.js `.scene` canvas at 2, the `.cta` button at 3, the edge-shading vignette (`body::after`) at 0, **behind everything**. It was briefly at 4, above the tiles and snake, and greyed the whole page; keep it at the back. The canvas has `pointer-events: none`, so clicks pass through to the button and links. If you add landing content, pick its z-index from this list.

## Floating icons

`FloatingIcons.tsx` renders 10 white rounded tiles, each holding the real logo of a Python data-science or data-analysis tool: Pandas, Python, NumPy, TensorFlow, Matplotlib, scikit-learn, Jupyter, PyTorch, Plotly, OpenCV. Only tools used with Python appear here, by the owner's request (no other programming languages). Each is an `<img>` of a self-hosted SVG in `public/icons/`, from the open-source Devicon set (MIT licence, `*-original.svg`, v2.16.0); the logos remain trademarks of their owners. Tiles are white so every brand colour stays visible on the dark page. Paths use `import.meta.env.BASE_URL`. To add a tool, download its Devicon SVG into `public/icons/`, add one entry to `tools` and (optionally) one more `.floater:nth-child(n)` rule for default tilt and speed (Devicon has no SciPy or Seaborn logo). Positions are random (see below). Tilt, speed and delay start from those rules but are overridden at random on every visit. Animation is off under `prefers-reduced-motion`.

## Lesson content model (content.ts)

A lesson is `{ slug, title, summary, sections[] }`. A section is `{ id, title, blocks[] }`. Block types:

| type | fields |
|---|---|
| `p` | `text` |
| `h3` | `text` |
| `ul`, `ol` | `items[]` |
| `code` | `code`, optional `output`, optional `label`, optional `runnable` (true = editable "Try it" box with a Run button) |
| `note` | `tone` (`tip` or `warn`), `title`, `text` |
| `table` | `head[]`, `rows[][]` |

Inline markup inside `text`, list items and table cells: `` `code` `` and `**bold**`. Callout `title`s are plain text (no markup).

Use `String.raw` (the `raw` helper at the top of the file) for code samples so `\n` stays a literal backslash-n.

### Adding a topic

Add one object to the `lessons` array in `content.ts`. It appears on the Contents page automatically and is reachable at `/contents/<slug>`.

### Current lesson

"Introduction to Python and Setup" has 8 sections: What is Python?, History, Installation, Ways to run Python, First programs, Python as a calculator, Practice, Homework and wrap-up. All timings from the original notes were deliberately removed. Output samples, the history timeline table and the operator table were added on top of the original text. Key phrases are bolded. The Installation section has a "Windows: install from the terminal" slide (winget commands: install, version check, search/upgrade) a "VS Code: install from the terminal" slide (winget install, `code --install-extension ms-python.python`, make a folder and `hello.py`, run it; brew/snap hints for macOS/Linux), and Common problems rows for `python` opening the Microsoft Store and `code` not recognised.

## Slides (Lesson.tsx)

- `toBands()` turns sections into slides: the content before the first `h3` is one slide titled with the section name; every `h3` starts a new slide (its title is the slide title, the section name becomes a small label). The 8 sections currently produce 22 slides.
- A title slide comes first and fills the screen (`min-height: 100vh`) with a "Start reading" button.
- `html.snap-page` (added while the notes page is mounted) turns on `scroll-snap-type: y mandatory`; each slide is `min-height: 100vh` with `scroll-snap-align: start`.
- Slide content fades and rises in via an `IntersectionObserver` (`.in-view`). A second observer, watching the middle line of the screen, drives the active dot and the "n / 22" counter. This works even for slides taller than the screen.
- Right-edge dots jump to a slide; they are hidden under 900px.
- **Navigation:** round up/down buttons at the bottom right go to the previous/next slide (`goTo()`), disabled at the ends. Keyboard: Left/Right arrows and Home/End move between slides. Up/Down and Page keys keep their normal scrolling (the snap settles on the next slide). Key handling is ignored while typing in a textarea/input.

## Slide pictures (Art.tsx and src/slides/)

Under each slide title (left column) there can be a picture. The left column is sticky, so the picture stays visible while a tall slide scrolls.

- **Drawn illustrations: only slides 1 and 2.** "What is Python?" (`hello-bubble`: Python logo plus a `print("Hello, World!")` speech bubble) and "What Python is used for" (`uses`: four labelled tiles with the Pandas, TensorFlow, Django and Bash logos). They are chosen in `content.ts` with `art: 'name'` on a section or on an `h3` block, and drawn by `Art.tsx`. The owner asked to remove the other illustrations I had drawn (installer window, terminals, editor, timeline, notebook, error cards, and so on), so do not re-add them unless asked.
- **The owner's own pictures (preferred).** The owner said they will supply the images. Drop a file into `src/slides/` named after the slide id, with extension png, jpg, jpeg, webp, gif, svg or avif, for example `installation-windows.png`. `Art.tsx` finds it with `import.meta.glob('./slides/*.{...}', { eager: true, query: '?url' })`, so Vite hashes it and adds the base path for GitHub Pages. A picture overrides a drawn illustration on the same slide. `src/slides/README.md` lists every slide id; keep it in sync when slides change (sub-slide id = `<section id>-<h3 title lowercased, non-alphanumerics to dashes, trimmed>`).
- Pictures render in `.art-image`: full column width (max about 520px), max height 42vh, `object-fit: contain`, rounded with an accent-tinted shadow.
- `public/icons/` holds the Devicon logos used on the landing page and on slides 1 and 2 (python, pandas, numpy, tensorflow, matplotlib, scikitlearn, jupyter, pytorch, plotly, opencv, django, bash). Other logos that were downloaded for removed illustrations were deleted.

## Try it: Python in the browser (TryIt.tsx)

- Any `code` block with `runnable: true` renders as an editable textarea with **Run** and **Reset** buttons and an output panel. Currently marked: the `hello.py` first program, the "Broken on purpose" errors example, the calculator example, and the "Your turn" box on the Practice slide.
- Python runs client-side with **Pyodide 0.26.4** (WebAssembly), loaded from `cdn.jsdelivr.net` the first time someone presses Run (a few MB; shows "Loading Python…"). Nothing is installed through npm and nothing runs on a server. If the user is offline the box shows "Could not load Python. Check your internet connection."
- stdout and stderr are captured into the output panel; errors show only the last 4 lines of the traceback (line number and error type) and are drawn in red.
- Tab inserts 4 spaces; Ctrl/Cmd+Enter runs the code. The Pyodide version is the constant `PYODIDE_VERSION` at the top of the file.
- `input()` is not supported in this box.
- `sizeOf()` picks `data-size` = `xl`, `l` or `m` from how much text a slide has. Short slides get bigger type (`--scale` 1.5 / 1.2 / 1) so they fill the screen. Slides containing code or a table always stay `m`.
- Each slide gets one of 8 soft background colours with a matching accent (blue, green, orange, purple, pink, teal, amber, indigo), cycling with `.band:nth-of-type(8n + k)`. The accent colours the eyebrow, title bar, bullets, bold text, table headers, code-block header and callout borders.
- Bold text is the slide's accent colour at heavier weight, with no highlight strip (the strip was tried and rejected).

## Styling notes

- Landing page palette: vivid navy (`#0a1a3f` to `#060e24`) with a bright blue centre glow, a violet glow at the top right and a green glow at the bottom; pure white logo tiles; green accent `#2ee38a`; snake greens. Yellow appears only in the favicon.
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
4. Added floating data-analyst icons (replaced in step 11 by language logos).
5. Added the Contents page (grid, one topic) and a small custom router, because the network was down and `wouter` could not be installed.
6. Added the notes page from the pasted lesson, without timings, then iterated: removed the "On this page" menu, switched to a white, 1450px-wide layout, bigger fonts, more colour.
7. Rebuilt the notes as per-sub-topic colour bands, then as full-screen scroll-snap slides with dots and a counter; added size-by-content scaling and bold key phrases; replaced the bold highlight strip with accent-coloured bold.
8. Pushed to GitHub and set up GitHub Pages with the base-path-aware router and the 404 fallback.
9. Landing page edit: replaced the 3D chrome "Python" text with a flat 2D title and removed all mouse interaction (snake, icons and button kept). Deleted the now-unused 3D font file. (Mouse follow for the snake was added later, in step 14.)
10. Added slide navigation (Prev/Next buttons, Left/Right/Home/End keys) and the in-browser "Try it" Python runner (Pyodide) on four code blocks.
11. Landing page: replaced the data-analyst icon glyphs with real programming-language logo SVGs (10 languages) on white tiles.
12. Landing page logos changed again: only Python data-science and analysis tools (Pandas, NumPy, Matplotlib, scikit-learn, TensorFlow, PyTorch, Jupyter, Plotly, OpenCV plus Python). Removed the other language logos.
13. Rebuilt the snake: smooth instanced body with a diamond-back pattern, slithering wave, proper head with eyes and a flicking forked tongue (it used to look like a worm).
14. Snake made bigger (150 segments, radius 0.85, head 1.65x) and it now chases the mouse cursor, wandering again after 3.5 s of idle.
15. Snake now slithers in front of the title (layer order change) and eats the floating logo tiles on contact; they pop and respawn after 2.5 s.
16. Logo tiles appear at random places on every visit and respawn at a new random place after being eaten (`placement.ts`).
17. Colour fix: the vignette was moved behind the content (it had been greying out tiles, snake and button) and the background was made more vivid (brighter blue, violet and green glows).
18. Notes: added Windows terminal install commands (winget) as their own slide, a `py` launcher tip and a Microsoft Store alias fix.
19. Notes: added a VS Code terminal install slide (winget, extension, practice folder) and a `code` not-recognised fix.
20. Slide pictures: tried drawn illustrations on every slide, then, at the owner's request, kept only slides 1 and 2 and added the `src/slides/` folder so the owner can supply their own images per slide (named after the slide id).

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
- Not yet done: a progress bar and remembering the last slide read, a quiz, a per-slide share link (slides already have anchor ids, e.g. `#installation-windows`), and `input()` support in the Try it box.
- Suggested next: make the Try it box check answers (for example expect a given output) so Practice can say "correct".
- The JS bundle is about 820 kB (mostly three.js). Code-splitting the landing scene with a dynamic `import()` would speed up the Contents and notes pages.
- The brand name "PyJourney" and all copy were written by the assistant; change them freely.
