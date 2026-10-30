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
6. **Ask before creating notes for any session.** When the owner pastes notes or mentions a new session, first ask what to create (a website lesson, a PDF, or both) and whether pictures should be included, then wait for the answer. Do not create session notes unprompted. (This rule was added after sessions 2 and 3 were added to the site straight from pasted notes.)
7. **Session PDFs go in the `Notes pdf/` folder, one PDF per session**, named `Session N - <title>.pdf`. If the session's notes use pictures, the PDF includes them. Sessions 1, 2 and 3 have PDFs (the owner asked for them). A new session gets a PDF only when the owner asks.

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
  ../scripts/notes-pdf.mjs   Builds a session PDF into "Notes pdf/" (see "Session PDFs")
  HeroCode.tsx              Animated code window and floating logos on the notes title screen
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

Add one object to the `lessons` array in `content.ts`. It appears on the Contents page automatically and is reachable at `/contents/<slug>`. Optional fields: `tag` (a third pill on the title screen) and `hero` (`{ file, lines, output }`: the code that types itself on the title screen; defaults to a hello.py example).

**Slide ids must be unique across lessons** because pictures in `src/slides/` are matched by id. Lesson 1 uses plain section ids (`history`, `practice`, ...); every later lesson prefixes its section ids (lesson 2 uses `s2-`, lesson 3 uses `s3-`).

**How the owner supplies a lesson.** The owner pastes the notes as markdown ("Session N: Title", numbered sections, code fences, tables, "Ask:" prompts). Turn each numbered section into a section; split long ones with `h3` blocks so every slide stays short; keep the owner's wording; remove any timings; render "Ask the class" and "Ask:" prompts as `note` blocks with tone `tip`; make examples `runnable` only when they work without `input()` (Pyodide cannot read the keyboard), keep one table to about 7 rows or fewer (split long tables across `h3` slides), and show `input()` examples as plain code with a label such as "Run this one in VS Code or a terminal". Run every new runnable box in the browser to confirm it works.

### Current lessons

**Lesson 1, "Introduction to Python and Setup"** (slug `introduction-to-python-and-setup`) has 8 sections: What is Python?, History, Installation, Ways to run Python, First programs, Python as a calculator, Practice, Homework and wrap-up. All timings from the original notes were deliberately removed. Output samples, the history timeline table and the operator table were added on top of the original text. Key phrases are bolded. The Installation section has a "Windows: install from the terminal" slide (winget commands: install, version check, search/upgrade) a "VS Code: install from the terminal" slide (winget install, `code --install-extension ms-python.python`, make a folder and `hello.py`, run it; brew/snap hints for macOS/Linux), and Common problems rows for `python` opening the Microsoft Store and `code` not recognised.

**Lesson 2, "Variables and Data Types"** (slug `variables-and-data-types`, section ids prefixed `s2-`, 24 slides, 13 runnable boxes): Recap, What is a variable? (the = sign, changing a variable, assigning several at once), naming rules (valid and invalid table, snake_case), data types (table, checking with `type()`), taking input (`input()` always returns a string), type conversion (int/float/str/bool, truncation, truthiness, the `TypeError` demo), basic operators (arithmetic, assignment, precedence), useful extras, practice (with a "find the error" box and a swap box) and homework. Its title-screen code is `variables.py`.

**Lesson 3, "Strings and Operators"** (slug `strings-and-operators`, section ids prefixed `s3-`, 31 slides, about 30 runnable boxes): Recap, What is a string? (quotes, escape characters with a table), indexing (diagram, the IndexError and immutability demos), slicing, string functions and methods (three small tables: changing the text, searching and checking, splitting and joining; plus a "methods return a new string" demo), string operations, f-strings (with `.2f` and thousands separators), operators (arithmetic revision, comparison with the `=` vs `==` warning, logical with a truth table, comparing strings, membership and identity, precedence list), practice (split into Strings, f-strings and operators, Find the output, and a starter box) and homework. Its title-screen code is `strings.py`. The ordered-list block supports `start` (the second practice list starts at 7).

## Slides (Lesson.tsx)

- `toBands()` turns sections into slides: the content before the first `h3` is one slide titled with the section name; every `h3` starts a new slide (its title is the slide title, the section name becomes a small label). The 8 sections currently produce 22 slides.
- **Title screen (slide 0)** is a full-screen dark hero (`.notes-hero`, same navy, blue, violet and green glows as the landing page, plus a faint dot grid). Left: a "Python for beginners" chip, the lesson title with the word "Python" in a yellow-to-green gradient, the summary, fact pills (slide count and number of runnable code boxes, computed from `content.ts`, plus the lesson's optional `tag`) and a yellow "Start reading" button. Right: `HeroCode.tsx`, a code window that types `# your first program` and `print("Hello, World!")` and then shows the output "Hello, World!" (loops every few seconds; static under reduced motion), with four floating white logo tiles (Python, Pandas, NumPy, Jupyter) placed in the side margins so they never cover the code. The old plain white title (`.lesson-head` / `.contents-head` styles) is no longer used by this page; `.contents-head` is still used by the Contents page and the "Topic not found" page.
- `html.snap-page` (added while the notes page is mounted) turns on `scroll-snap-type: y mandatory`; each slide is `min-height: 100vh` with `scroll-snap-align: start`.
- Slide content fades and rises in via an `IntersectionObserver` (`.in-view`). A second observer, watching the middle line of the screen, drives the active dot and the "n / 22" counter. This works even for slides taller than the screen.
- Right-edge dots jump to a slide; they are hidden under 900px.
- **Navigation:** round up/down buttons at the bottom right go to the previous/next slide (`goTo()`), disabled at the ends. Keyboard: Left/Right arrows and Home/End move between slides. Up/Down and Page keys keep their normal scrolling (the snap settles on the next slide). Key handling is ignored while typing in a textarea/input.

## Session PDFs (`Notes pdf/`)

Printable notes for each session live in `Notes pdf/` (committed). Generate or refresh one with:

```bash
node --experimental-strip-types scripts/notes-pdf.mjs 1      # session number, or a lesson slug
```

- **How it works.** `scripts/notes-pdf.mjs` reads the lesson from `src/content.ts` (session N = the Nth lesson in the `lessons` array), builds a styled A4 HTML page (coloured title block, one colour per section like the website, code blocks with outputs, tables, tip and warning boxes, page numbers in the footer) and prints it to PDF with headless Chrome over the DevTools protocol. No packages are installed. Set `CHROME_PATH` if Chrome is not at the usual Windows path.
- **Pictures.** For each section and sub-section, the script looks in `src/slides/` for a file named after the slide id (`<id>.webp`, `<id>-2.webp`, ...), the same files the website shows, and puts them under that heading (side by side when there are two). They are shrunk to at most 1100px wide JPEG in the page before printing, which keeps a PDF with two pictures under 1 MB (unshrunk it was 5 MB). The drawn illustrations on slides 1 and 2 of lesson 1 are not images, so they are not in the PDF.
- **What is not in the PDF:** the interactive "Try it" boxes become ordinary code blocks, and the website's slide layout, title-screen animation and zoom are not reproduced.
- **Previewing without a PDF viewer.** Set `NOTES_PREVIEW=<path prefix>` and the script also saves `<prefix>_1.png`, `<prefix>_2.png`, ... (A4-sized pictures of the page). The real PDF page breaks can differ slightly (the preview ignores the page margins).
- **Current PDFs:** `Session 1 - Introduction to Python and Setup.pdf` (about 730 KB, includes the two History pictures), `Session 2 - Variables and Data Types.pdf` (about 280 KB) and `Session 3 - Strings and Operators.pdf` (about 330 KB). Sessions 2 and 3 have no pictures yet, so their PDFs have none; if the owner adds pictures to `src/slides/` for them, regenerate.
- If a lesson is edited after its PDF was made, regenerate that PDF.

## Slide pictures (Art.tsx and src/slides/)

Under each slide title (left column) there can be a picture. The left column is sticky, so the picture stays visible while a tall slide scrolls.

- **Drawn illustrations: only slides 1 and 2.** "What is Python?" (`hello-bubble`: Python logo plus a `print("Hello, World!")` speech bubble) and "What Python is used for" (`uses`: four labelled tiles with the Pandas, TensorFlow, Django and Bash logos). They are chosen in `content.ts` with `art: 'name'` on a section or on an `h3` block, and drawn by `Art.tsx`. The owner asked to remove the other illustrations I had drawn (installer window, terminals, editor, timeline, notebook, error cards, and so on), so do not re-add them unless asked.
- **The owner's own pictures (preferred).** The owner said they will supply the images. Drop a file into `src/slides/` named after the slide id, with extension png, jpg, jpeg, webp, gif, svg or avif, for example `installation-windows.png`. `Art.tsx` finds it with `import.meta.glob('./slides/*.{...}', { eager: true, query: '?url' })`, so Vite hashes it and adds the base path for GitHub Pages. A picture overrides a drawn illustration on the same slide. `src/slides/README.md` lists every slide id; keep it in sync when slides change (sub-slide id = `<section id>-<h3 title lowercased, non-alphanumerics to dashes, trimmed>`).
- Pictures render in `.art-image`: natural proportions, at most the column width (about 520px) and 52vh tall (never stretched, no white frame), with **square corners** (the owner does not want rounded corners on pictures; `border-radius: 0` on `.art-image`, `.art-zoom` and the lightbox image) and an accent-tinted shadow. Never set both a width and a max-height of 100% on a picture: it would stretch; use `width: auto` with `max-width` and `max-height` on wide screens.
- **Several pictures on one slide.** Name them `<id>.webp` (first), `<id>-2.webp`, `<id>-3.webp`, and so on; they stack top to bottom in the left column (`picturesFor()` in `Art.tsx`). With more than one (`.art-multi`), each is capped at about 34vh tall on wide screens, which is enough for them to fill the left column while both still fit on screen under the title; a single picture can be up to 52vh. On narrow screens (900px and below) pictures use the full width of the slide (up to 640px) and several pictures sit side by side in two columns. Each picture is clickable for zoom.
- **Pictures in use:** `src/slides/history.webp` on slide 4 (History): a "Guido van Rossum, Creator of Python" info card supplied by the owner (the owner replaced the file once; the current version is landscape). A second picture, `src/slides/history-2.webp` (a Monty Python's Flying Circus collage, 1448x1086, about 315 KB), sits below it, matching the "name comes from Monty Python" sentence. The owner's originals are `Images/Guido van Rossum_ Python’s Creator.png` and `Images/Monty Python Flying Circus Collage.png` (about 2 MB, 1448x1086); it was converted to WebP (about 170 KB, same size, quality 0.85) because WebP is much smaller. The `Images/` folder holds the owner's originals and is not committed.
- **Click to zoom.** A slide picture from `src/slides/` is wrapped in `Zoomable` (in `Art.tsx`): clicking it opens a full-screen overlay (`.lightbox`) with the picture centred, scaled to at most 94% of the screen, over a dark blurred backdrop. Click anywhere, press Esc, or use the round close button to close. While it is open, the slide arrow keys are ignored (`Lesson.tsx` checks for `.lightbox`). The overlay is rendered with `createPortal` into `document.body`: the left column is `position: sticky`, which creates its own stacking context, so an overlay left inside it stayed below the slide counter and arrow buttons. Do not move it back inside the slide. The drawn illustrations on slides 1 and 2 are not zoomable.
- **Converting images to WebP:** no image library is installed (no sharp, no Pillow) and npm may be offline, so the conversion was done in headless Chrome: load the image from the dev server (same origin, so the canvas is not tainted), draw it on a canvas, and `canvas.toDataURL("image/webp", 0.85)`. Use the same approach for new pictures, or any online converter. Keep pictures under about 300 KB each.
- `public/icons/` holds the Devicon logos used on the landing page and on slides 1 and 2 (python, pandas, numpy, tensorflow, matplotlib, scikitlearn, jupyter, pytorch, plotly, opencv, django, bash). Other logos that were downloaded for removed illustrations were deleted.

## Try it: Python in the browser (TryIt.tsx)

- Any `code` block with `runnable: true` renders as an editable textarea with **Run** and **Reset** buttons and an output panel. Currently marked: the `hello.py` first program, the "Broken on purpose" errors example, the calculator example, and the "Your turn" box on the Practice slide.
- Python runs client-side with **Pyodide 0.26.4** (WebAssembly), loaded from `cdn.jsdelivr.net` the first time someone presses Run (a few MB; shows "Loading Python…"). Nothing is installed through npm and nothing runs on a server. If the user is offline the box shows "Could not load Python. Check your internet connection."
- stdout and stderr are captured into the output panel; errors show only the traceback from the learner's own code onward (the Pyodide internal frames above it are cut, and `<exec>` is renamed "your code"), so the learner sees the line number and the error type, drawn in red.
- Tab inserts 4 spaces; Ctrl/Cmd+Enter runs the code. The Pyodide version is the constant `PYODIDE_VERSION` at the top of the file.
- `input()` is not supported in this box.
- `sizeOf()` picks `data-size` = `xl`, `l` or `m` from how much text a slide has. Short slides get bigger type (`--scale` 1.5 / 1.2 / 1) so they fill the screen. Slides containing code or a table always stay `m`.
- Each slide gets one of 8 soft background colours with a matching accent (blue, green, orange, purple, pink, teal, amber, indigo), cycling with `.band:nth-of-type(8n + k)`. The accent colours the eyebrow, title bar, bullets, bold text, table headers, code-block header and callout borders.
- Bold text is the slide's accent colour at heavier weight, with no highlight strip (the strip was tried and rejected).

## Mobile (phones and small tablets)

The whole site is built to work on a phone (tested at 390x844, 360x740 and 820x1180 with touch emulation: no sideways scrolling on any page). The rules live in the **last blocks of `index.css`** ("phones and small tablets", at 900px and 700px/420px breakpoints):

- **Grid columns use `minmax(0, 1fr)`** (`.hero-grid`, `.band-inner`). A plain `1fr` lets wide code, tables or long words push the column wider than the screen and makes the whole page scroll sideways. `.topic-grid` uses `minmax(min(100%, 380px), 1fr)` for the same reason. `html, body` also get `overflow-x: hidden` on small screens as a safety net.
- **Slides become ordinary sections** on phones: `min-height: auto`, `scroll-snap-type: y proximity` (mandatory snapping fights with slides taller than a phone), and the title screen uses `100svh`.
- **Type sizes are fixed rem values** on phones (body 1.1rem, slide titles 2.1rem, code 0.9rem, tables 0.92rem) instead of the vw/vh formulas used on desktop.
- **Code boxes** do not wrap long lines (`wrap="off"`, `white-space: pre`); they scroll sideways. Tables scroll sideways inside `.table-wrap`.
- **Floating controls are hidden at 700px and below:** the slide counter and the up/down buttons covered the text. Swiping is the navigation on phones (the dots are hidden at 900px and below).
- **Landing logos:** on screens narrower than 700px `placeTile()` keeps the whole middle band (26% to 76% of the height) free, because the title fills the width; tiles go above and below it.
- To check a change on a phone: emulate a mobile device in Chrome DevTools, or in a script call `Emulation.setDeviceMetricsOverride` with `mobile: true`, and compare `document.documentElement.scrollWidth` with `clientWidth` (they must be equal).

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
21. Slide 4 (History) now shows the owner's Guido van Rossum picture (`src/slides/history.webp`, converted from PNG to WebP); picture frames now hug the image instead of showing a white strip.
22. Click-to-zoom lightbox for slide pictures; History picture replaced by the owner's updated landscape version.
23. History slide got a second picture (Monty Python collage, `history-2.webp`); slides can now have several stacked pictures via `<id>-2`, `<id>-3` file names.
24. Slide pictures: square corners, fill the column on wide screens, full width / two columns on narrow screens.
25. Notes title screen redesigned (it looked boring): dark vivid hero with a typing code window, floating tool logos, fact pills and a yellow call-to-action.
26. Added lesson 2, "Variables and Data Types" (second card on the Contents page); per-lesson `hero` code and `tag` on the title screen; the Try it error output now shows only the learner's line and the error type (internal Pyodide frames are hidden).
27. Added lesson 3, "Strings and Operators" (third card on the Contents page). Tables got smaller text and tighter cells (and no wrapping of code cells) so long ones fit on one screen; ordered lists accept `start`; table rows use index keys.
28. Mobile pass: no sideways scrolling anywhere, fixed phone type sizes, slides as normal sections on phones, Contents cards fit the width, landing logos avoid the title, code boxes scroll instead of wrapping, floating counter and arrows hidden on phones.
29. Session 1 PDF created in `Notes pdf/` (with the History pictures) using the new `scripts/notes-pdf.mjs`; new owner rules: ask before creating any session notes, PDFs per session in `Notes pdf/`, include pictures.
30. Session 2 and Session 3 PDFs created in `Notes pdf/` at the owner's request (no pictures in them yet).

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
