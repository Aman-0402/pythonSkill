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
6. **Ask before creating notes for any session, unless the owner has said "no need to ask just do it"** (they did, from session 8 on: when they send a new session topic, build the lesson, PDF and quiz CSV in one go and publish, with no co-author line). Otherwise: when the owner pastes notes or mentions a new session, first ask what to create (a website lesson, a PDF, a quiz, or all of them), who writes the content, and whether pictures should be included, then wait for the answer. Do not create session notes unprompted. (This rule was added after sessions 2 and 3 were added to the site straight from pasted notes.)
7. **When the owner picks "I draft it" for a session:** write the notes in the style of the earlier sessions (recap with "Ask" prompts, short slides, runnable examples that work without `input()`, practice questions, homework), build the lesson and the PDF **locally**, run every code box in the browser, then tell the owner where to review it and which choices were the assistant's own (invented numbers, guessed next class). **Publish (Agent.md, commit, push) only after the owner says so.**
8. **Every session also gets a quiz CSV** in `Quiz in CSV/` (see "Session quizzes"). When the owner asks for a new session, include the quiz in the question about what to create.
9. **Session PDFs go in the `Notes pdf/` folder, one PDF per session**, named `Session N - <title>.pdf` (see "Session PDFs"). If the session's notes use pictures, the PDF includes them. Sessions 1 to 18 have PDFs.
10. **Open `quiz-template.csv` before touching the quiz files**, and generally look for a template or example the owner mentions before building from the written description.

## What this is

A small learning website for Python beginners, plus printable notes and quizzes for each class session. Three screens:

1. **Landing (`/`)**: dark, premium page: a flat 2D "Python" title, a big green 3D snake that wanders on its own and chases the mouse cursor, floating Python data-science and analysis logos, and a glass "Start your journey" button. The snake is the only thing that reacts to the mouse.
2. **Contents (`/contents`)**: white page with a grid of topic cards, one per lesson (eighteen today, listed under "Current lessons").
3. **Notes (`/contents/<slug>`)**: the lesson, shown as full-screen scroll-snapping slides, one per sub-topic, each with its own colour, with runnable Python boxes.

Outside the website: `Notes pdf/` (one PDF per session), `Quiz in CSV/` (one quiz per session, for the owner's quiz app), `Images/` (the owner's original pictures) and `quiz-template.csv` (the owner's CSV template).

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
| Python in the browser | Pyodide 0.26.4 from the jsdelivr CDN (the "Try it" boxes and the PDF outputs) |
| Hosting | GitHub Pages via GitHub Actions |
| Tools for the scripts | Google Chrome (PDFs), local `python` on the PATH (quiz answer checks), internet (Pyodide) |

## Commands

```bash
npm run dev       # dev server on :5173
npm run build     # tsc -b && vite build  -> dist/
npm run preview   # serve the production build
npm run lint      # oxlint
npx tsc -b        # typecheck only (run after every change)

node --experimental-strip-types scripts/notes-pdf.mjs 3   # PDF for session 3 -> "Notes pdf/"
node --experimental-strip-types scripts/quiz-csv.mjs      # all quiz CSVs -> "Quiz in CSV/" (add a number for one session)
```

## File map

```
index.html                    Fonts, title "Learn Python", mounts #root
vite.config.ts                base = '/pythonSkill/' only when GITHUB_ACTIONS is set
Agent.md                      This file
quiz-template.csv             The owner's CSV template for the quizzes (see "Session quizzes")
Images/                       The owner's original pictures (PNG); committed by the owner
Notes pdf/                    One PDF per session
Quiz in CSV/                  One quiz CSV per session
scripts/
  notes-pdf.mjs               Builds a session PDF (see "Session PDFs")
  quiz-csv.mjs                Builds the quiz CSV files (see "Session quizzes")
  quiz-data/s1.mjs ... s18.mjs The quiz questions, one file per session
public/
  favicon.svg                 Python-style logo
  icons/*.svg                 Devicon logos (MIT): python, pandas, numpy, tensorflow, matplotlib, scikitlearn, jupyter, pytorch, plotly, opencv, django, bash
src/
  main.tsx                    React entry
  App.tsx                     Picks a page from the URL path
  router.tsx                  usePath, navigate, <Link>, base-path aware
  Landing.tsx                 Scene + FloatingIcons + flat 2D "Python" title + CTA link to /contents
  Scene.tsx                   three.js: green snake, lights, dust (snake follows the pointer; no 3D text)
  placement.ts                placeTile(): random on-screen spot for a logo tile
  FloatingIcons.tsx           10 floating Python data-science logo tiles (real SVG files)
  Contents.tsx                Topic grid, built from `lessons`
  Lesson.tsx                  Notes page: block renderer, toBands(), sizeOf(), slides UI, arrow keys, Prev/Next buttons
  HeroCode.tsx                Animated code window and floating logos on the notes title screen
  Art.tsx                     Picture under a slide title: drawn illustration (slides 1 and 2 only) or the owner's file from src/slides/
  Highlight.tsx               Tiny Python syntax colouring used by code blocks and illustrations
  TryIt.tsx                   Editable code box that runs Python in the browser (Pyodide)
  lock.ts                     LOCK_FROM: sessions from this number to the end are locked on the website
  Draw.tsx                    Pen overlay + white screen with shapes, text, select and erasers, for explaining code in a dry run (rendered by App.tsx on every page)
  content.ts                  ALL lesson text and its types (the only place to edit lesson content)
  slides/                     The owner's slide pictures (WebP), plus README.md with how to add them
  index.css                   All styles
.github/workflows/deploy.yml  Build and deploy to Pages
```

## Routing

`App.tsx` strips trailing slashes, then:

- `/contents` -> `Contents`
- `/contents/<slug>` -> `Lesson` (slug must match a `lessons[].slug`; otherwise a "Topic not found" page)
- anything else -> `Landing`

`router.tsx` keeps a `BASE` (`''` locally, `/pythonSkill` on Pages) taken from `import.meta.env.BASE_URL`. `<Link href="/contents">` always takes an app-relative path; the base is added inside. Use `<Link>` for every internal navigation so the base path stays correct. Plain `#anchor` hrefs are fine.

## Landing page (Scene.tsx)

- Renderer is transparent; the page background is CSS (navy gradient + vignette via `body::after`).
- **Title:** the "Python" heading is plain HTML/CSS (`.hero-title`): flat 2D, white-to-light-blue gradient text with a soft blue glow. It was a 3D chrome text earlier; it was removed on request. The pointer now only steers the snake (see below).
- **Lighting:** a `RoomEnvironment` reflection map plus a warm key light, a blue rim light and a green point light, used for the snake's glossy look.
- **Snake:** the body is one `InstancedMesh` of 150 small overlapping spheres (spacing 0.15), so it reads as a smooth, scaly body instead of a chain of beads. Thickness comes from `radius(i)`: narrow neck, full belly, long tapering tail (max radius 0.85). Colouring is a diamond-back pattern set per instance: dark green saddles with pale-green edges on a green body, with slight random brightness per scale. The head wanders: its turn rate is a sum of sines (smooth, random-looking) and near the screen edge it steers back toward the centre; every segment follows the one in front at a fixed spacing. For **slithering**, each segment is pushed sideways along a travelling sine wave (amplitude grows toward the tail), applied only when rendering, not to the path. The **head** is a separate group: a flattened wedge skull plus snout, a dark stripe on top, golden eyes with slit pupils, and a red forked tongue that flicks out for a moment every couple of seconds. It is scaled 1.65x and faces the direction of travel. It slithers **in front of** the "Python" title but behind the button (see "Landing layers").
- **Mouse follow:** a `pointermove` listener on `window` stores the cursor (NDC). While the cursor moved within the last `IDLE_MS` (3.5 s) the head aims at it, projected onto the snake's plane: turn rate is clamped (about 3.6 rad/s) so it curves like a real snake, and speed scales with distance (2.5 to 8). After the cursor is idle it goes back to random wandering.
- **Eating logos:** `eatLogos()` projects a point just in front of the head (the mouth) to screen pixels and compares it with each `.floater` tile's `getBoundingClientRect()`. On contact the tile gets class `eaten` (CSS pop-and-vanish); after `EAT_RESPAWN_MS` (2.5 s) it is re-placed with `placeTile()`, gets class `back` (pops in again) and is safe from being eaten for another 1.5 s. Timers and classes are cleaned up on unmount.
- **Reduced motion:** no wander, no follow, no eating, no wave, no tongue flick; the dust stops and the scene renders once.
- The scene is mounted only on the landing page and disposes its renderer, geometries and listeners on unmount.

### Random logo placement

`placeTile()` in `src/placement.ts` sets inline `left`/`top` percentages on a tile: anywhere from 4 to 92% across and 6 to 90% down, except the middle band (x 26 to 74%, y 28 to 74%) where the title and button live, and not within about 11% across / 14% down of another tile (after 60 tries it accepts an overlap rather than loop forever). On screens narrower than 700px the whole middle band (y 26 to 76%) is kept free, because the title fills the width. `FloatingIcons` calls it in a `useLayoutEffect` on mount, so every visit has a new layout and tiles never jump after first paint; it also randomises `--r` (tilt), `--dur` and `--delay`.

### Landing layers

The `.landing` container does not create a stacking context (`z-index: auto`) so its children can interleave with the 3D canvas: floating tiles and `.hero-title` at z-index 1, the three.js `.scene` canvas at 2, the `.cta` button at 3, the edge-shading vignette (`body::after`) at 0, **behind everything**. It was briefly at 4, above the tiles and snake, and greyed the whole page; keep it at the back. The canvas has `pointer-events: none`, so clicks pass through to the button and links. If you add landing content, pick its z-index from this list.

## Floating icons

`FloatingIcons.tsx` renders 10 white rounded tiles, each holding the real logo of a Python data-science or data-analysis tool: Pandas, Python, NumPy, TensorFlow, Matplotlib, scikit-learn, Jupyter, PyTorch, Plotly, OpenCV. Only tools used with Python appear here, by the owner's request (no other programming languages). Each is an `<img>` of a self-hosted SVG in `public/icons/`, from the open-source Devicon set (MIT licence, `*-original.svg`, v2.16.0); the logos remain trademarks of their owners. Tiles are white so every brand colour stays visible on the dark page. Paths use `import.meta.env.BASE_URL`. To add a tool, download its Devicon SVG into `public/icons/`, add one entry to `tools` and (optionally) one more `.floater:nth-child(n)` rule for default tilt and speed (Devicon has no SciPy or Seaborn logo). Positions are random (see above); tilt, speed and delay start from those rules but are overridden at random on every visit. Animation is off under `prefers-reduced-motion`.

## Lesson content model (content.ts)

A lesson is `{ slug, title, summary, tag?, hero?, sections[] }`. A section is `{ id, title, art?, blocks[] }`. Block types:

| type | fields |
|---|---|
| `p` | `text` |
| `h3` | `text`, optional `art` (name of a drawn illustration) |
| `ul` | `items[]` |
| `ol` | `items[]`, optional `start` (the number the list starts at) |
| `code` | `code`, optional `output`, optional `label`, optional `runnable` (true = editable "Try it" box with a Run button) |
| `note` | `tone` (`tip` or `warn`), `title`, `text` |
| `table` | `head[]`, `rows[][]` |

Inline markup inside `text`, list items and table cells: `` `code` `` and `**bold**`. Callout `title`s are plain text (no markup). A `code span` can sit inside `**bold**` (the site and the PDF script both handle it; a `*` inside the code, such as `*args`, still breaks it, so do not bold around that).

Use `String.raw` (the `raw` helper at the top of the file) for code samples so `\n` stays a literal backslash-n.

### Adding a topic

Add one object to the `lessons` array in `content.ts`. It appears on the Contents page automatically and is reachable at `/contents/<slug>`. Optional fields: `tag` (a third pill on the title screen) and `hero` (`{ file, lines, output }`: the code that types itself on the title screen; `output` may contain newlines; defaults to a hello.py example).

**Slide ids must be unique across lessons** because pictures in `src/slides/` are matched by id. Lesson 1 uses plain section ids (`history`, `practice`, ...); every later lesson prefixes its section ids with `sN-` (`s2-`, `s3-`, ...).

**How the owner supplies a lesson.** Either the owner pastes the notes as markdown ("Session N: Title", numbered sections, code fences, tables, "Ask:" prompts), or asks the assistant to draft them (rule 7). Turn each numbered section into a section; split long ones with `h3` blocks so every slide stays short; keep the owner's wording; remove any timings; render "Ask the class" and "Ask:" prompts as `note` blocks with tone `tip`; make examples `runnable` only when they work without `input()` (Pyodide cannot read the keyboard), keep one table to about 7 rows or fewer (split long tables across `h3` slides), and show `input()` examples as plain code with a label such as "Run this one in VS Code or a terminal". Run every new runnable box in the browser to confirm it works.

**Never mark a code box `runnable` if it can run forever or wait for the keyboard.** An infinite loop freezes the browser tab, and `input()` is unsupported.

### Current lessons

Slide counts are what the title-screen pill and the "n / N" counter show.

1. **"Introduction to Python and Setup"** (slug `introduction-to-python-and-setup`, 22 slides): What is Python?, History, Installation, Ways to run Python, First programs, Python as a calculator, Practice, Homework and wrap-up. All timings from the original notes were deliberately removed. Output samples, the history timeline table and the operator table were added on top of the original text. Key phrases are bolded. Installation has "Windows: install from the terminal" (winget: install, version check, search/upgrade) and "VS Code: install from the terminal" (winget install, `code --install-extension ms-python.python`, make a folder and `hello.py`, run it; brew/snap hints for macOS/Linux) slides, and Common problems rows for `python` opening the Microsoft Store and `code` not recognised. Pictures: History has two (see "Slide pictures"); slides 1 and 2 have drawn illustrations. Has the `tag` "Windows, macOS and Linux".
2. **"Variables and Data Types"** (slug `variables-and-data-types`, prefix `s2-`, 24 slides, 13 runnable boxes): Recap, What is a variable? (the = sign, changing a variable, assigning several at once), naming rules (valid and invalid table, snake_case), data types (table, checking with `type()`), taking input (`input()` always returns a string), type conversion (int/float/str/bool, truncation, truthiness, the `TypeError` demo), basic operators (arithmetic, assignment, precedence), useful extras, practice (with a "find the error" box and a swap box) and homework. Title-screen code `variables.py`.
3. **"Strings and Operators"** (slug `strings-and-operators`, prefix `s3-`, 31 slides, about 30 runnable boxes): Recap, What is a string? (quotes, escape characters with a table), indexing (diagram, the IndexError and immutability demos), slicing, string functions and methods (three small tables with a result on every row: changing the text, searching and checking, splitting and joining; **every method also has its own small Try it box** on slides grouped by method; plus a "methods return a new string" demo), string operations, f-strings (with `.2f` and thousands separators), operators (arithmetic revision, comparison with the `=` vs `==` warning, logical with a truth table, comparing strings, membership and identity, precedence list), practice and homework. Title-screen code `strings.py`.
4. **"Conditional Statements"** (slug `conditional-statements`, prefix `s4-`, 28 slides, 21 runnable boxes, drafted by the assistant and reviewed by the owner): Recap, why we need conditions (with a "which statement when" table), the `if` statement (colon and indentation, multi-line blocks, an IndentationError demo), `if ... else`, the `if ... elif ... else` ladder (order matters, separate ifs vs elif), nested conditions (nested vs `and`, largest of three), writing good conditions (and/or/not, chained comparison, `in`, truthy and falsy values, `lower()` for text), the one-line `if`, common mistakes (a table plus runnable demos of `=` vs `==` and text vs number), practice (basic and harder questions, find the output, a leap-year starter box) and homework (marks and grade, an electricity bill with invented rates, triangle checks). Title-screen code `age.py`.
5. **"Loops"** (slug `loops`, prefix `s5-`, 31 slides, 21 runnable boxes, drafted and reviewed): Recap, why loops (with and without a loop, `for` vs `while` table), the `for` loop (strings, a list preview, `end=" "`), `range()` (three forms, sum of 1 to 10, a multiplication table), the `while` loop (counting, may run zero times, sum of digits), infinite loops (the infinite example is deliberately **not** runnable; a `while` password check with `input()` is plain code), `break` (including `while True`), `continue`, loops inside loops (star triangle, multiplication grid), common mistakes, practice and homework (multiplication table with an f-string, a guessing game, FizzBuzz, counting digits). Title-screen code `loop.py`.
6. **"Loop Practice"** (slug `loop-practice`, prefix `s6-`, 27 slides, about 19 runnable boxes, drafted and reviewed): Recap, how nested loops run (trace table), pattern programs (rectangle, right and inverted triangles, number triangles, pyramid, a "pattern recipe" table), factorial (for, while, and many factorials with the accumulator reset), prime numbers (basic check with a flag and `break`, the square-root shortcut, all primes up to 30), Fibonacci (for and while), more number programs (reverse a number and palindrome check, GCD), tips and common mistakes, practice and homework (diamond, Armstrong and perfect numbers, primes between two numbers). Title-screen code `pattern.py`.
7. **"Lists"** (slug `lists`, prefix `s7-`, 32 slides, about 27 runnable boxes, drafted and reviewed): Recap, what a list is, indexing (including changing an item), slicing (including slice assignment), methods in small tables (adding, removing, searching, sorting, useful functions, and the "these methods return None" trap), list operations and the copy pitfall (`b = a` vs `a.copy()`), loops over lists (for, index, `enumerate`, while, building a list, filtering, a list-comprehension preview), lists inside lists, common mistakes, practice and homework. Title-screen code `lists.py`. The closing "Next class: Tuples and dictionaries" is the assistant's guess.
8. **"Tuples and Sets"** (slug `tuples-and-sets`, prefix `s8-`, 17 sections, about 45 runnable boxes, published without a review round because the owner said "no need to ask just do it"): Recap, what a tuple is (one-item tuple, `tuple()`), indexing/slicing/`count`/`index`, immutability (errors, building a new tuple, the tuple-holding-a-list warning), tuple or list, unpacking, star unpacking, loops and returning many values, tuple operations, what a set is (`{}` is a dict, `set()`), using a set, set methods (`remove` vs `discard`), set operations (union, intersection, difference, symmetric difference), subset/superset/disjoint, in-place operators, `frozenset`, real-life examples, a list/tuple/set table, practice, homework. Title-screen code `tuples_sets.py`. Set examples print only ints or use `sorted()`, because string sets print in a different order on each run. The closing "Next class: Dictionaries" is the assistant's guess.
9. **"Dictionaries"** (slug `dictionaries`, prefix `s9-`, 19 sections, 38 runnable boxes, published in one go like lesson 8): Recap, what a dictionary is, making one (`dict()`, repeated keys, what can be a key), reading (`d[key]`, `KeyError`, `get`, `in` checks keys), adding/changing (`update`, `setdefault`), removing (`pop`, `del`, `popitem`, `clear`), `keys`/`values`/`items`, looping, copying and `|` joining, nested dictionaries, lists of dictionaries, counting letters and words (the `get(key, 0) + 1` pattern), grouping with `setdefault`, dictionary comprehensions and sorting, a list/tuple/set/dictionary table, common mistakes, practice, homework. Title-screen code `dictionaries.py`. The closing "Next class: Functions" is the assistant's guess.
10. **"Revision and Mini Project"** (slug `revision-and-mini-project`, prefix `s10-`, 21 sections, 20 runnable boxes, `tag: 'Project'`, published in one go): recap, a table of sessions 1 to 9, short revision boxes, then **Project 1 student marks manager** (dictionary of name to list of marks; add with `setdefault`, report with f-string alignment, topper and ranking, a command loop) and **Project 2 contact book** (nested dictionary; search, update, delete, list). Each project has a **browser-runnable version driven by a list of scripted commands** (no `input()` in the browser) and a **full `input()` menu program** shown as a non-runnable code box (both were tested with piped input). Written before functions were taught on purpose; the closing note points at Functions. Title-screen code `marks_manager.py`.
11. **"Functions"** (slug `functions`, prefix `s11-`, 19 sections, 26 runnable boxes, published in one go): recap, what a function is, `def` and calling (forgetting the brackets), parameters vs arguments, `return` (and `print` is not `return`, `None`), several `return` lines, returning a tuple, default and keyword arguments, `*args`, docstrings, scope (local, global, shadowing, the `global` keyword and why to avoid it), lists changed inside functions, functions calling functions, recursion (factorial), the marks manager rewritten with functions, a safe `read_number()` (non-runnable, tested with piped input), common mistakes, practice, homework. Title-screen code `functions.py`. The closing "Next class: Files and error handling" is the assistant's guess.
12. **"Advanced Functions"** (slug `advanced-functions`, prefix `s12-`, 19 sections, 31 runnable boxes, published in one go): default arguments and the mutable-default trap (`None` fix), keyword arguments, `*args`, `**kwargs`, all together and their order, unpacking in calls (`*` and `**`), keyword-only parameters, functions as values, `lambda`, `lambda` with `sorted`/`min`/`max` keys, `map`, `filter`, chaining and the list-comprehension equivalents, `zip` and `reduce`, a function returning a function, common mistakes, practice, homework. Printing a bare `map(...)` shows a memory address that changes each run (only in a "Try it" box). Title-screen code `advanced.py`. The closing "Next class: Files and error handling" is the assistant's guess.
13. **"Modules and Packages"** (slug `modules-and-packages`, prefix `s13-`, 17 sections, 26 runnable boxes + 3 empty practice boxes): modules and `import`, import styles (`as`, `from`, avoid `*`), `math`, `random` (incl. `seed`, `shuffle` returns None, dice/OTP/password examples), `datetime` (date, datetime, timedelta, `strftime`/`strptime`, weekday), `statistics`, `Counter`, `time`, `dir()`, own modules and `__name__ == "__main__"`, packages and `__init__.py`, `pip install` and `venv`/`requirements.txt` (terminal boxes are not runnable), common mistakes (two boxes fail on purpose), practice, homework. Random/clock boxes print different output each run; the PDF keeps one run. Title-screen code `modules.py`.
14. **"File Handling"** (slug `file-handling`, prefix `s14-`, 18 sections, 27 runnable boxes + 3 empty practice boxes): why files, `open()` and modes (`r w a x r+`, `b`), `write`/`writelines`, `with`, `read`/`readline`/`readlines`/looping, numbers from files are strings, file position (`seek`/`tell`), append vs write, text examples (count, search, copy), `os.path.exists`/`remove`, paths/`pathlib`/`encoding`, to-do list (non-runnable `input()` program plus a runnable version), CSV (`csv.reader`/`writer`, `newline=""`, `DictReader`/`DictWriter`), marks report, common mistakes (one box fails on purpose, plus a deliberate `FileNotFoundError` box), practice, homework. Try it boxes use the browser temporary file area, so each box writes the file it needs. Title-screen code `files.py`.
15. **"Exception Handling"** (slug `exception-handling`, prefix `s15-`, 17 sections, 25 runnable boxes + 3 empty practice boxes + 4 "fix the bug" boxes that fail on purpose): what an exception is, `try`/`except`, specific errors, `as e`, several errors, `else`/`finally`, a table of common errors with a box that triggers and catches each, safe number input (non-runnable `input()` program plus a runnable version), `raise`, custom exception class, exceptions with files, why a bare `except` is bad, reading a traceback, debugging tips, `assert`, find-and-fix boxes, common mistakes, practice, homework. Title-screen code `safe.py`. The closing "Next class: Object-oriented programming" is the assistant guess.
16. **"NumPy Basics"** (slug `numpy-basics`, prefix `s16-`, 18 sections, 33 runnable boxes incl. 2 that fail on purpose + 4 empty practice boxes): what NumPy is, lists vs arrays, creating arrays (`array`, `zeros`, `ones`, `full`, `arange`, `linspace`, `eye`), attributes (`ndim`, `shape`, `size`, `dtype`), understanding shape, dtype and `astype`, `reshape`/`T`/`flatten`, indexing and slicing in 1D and 2D (slices are views, `.copy()`), boolean and fancy indexing, maths and `axis`, a marks-table example, common mistakes, practice, homework. Needs numpy loaded in the browser (see Try it notes). Title-screen code `arrays.py`. The closing "Next class" is the assistant guess.
17. **"NumPy Operations"** (slug `numpy-operations`, prefix `s17-`, 16 sections, 39 runnable boxes incl. 3 that fail on purpose + 5 empty practice boxes): vectorised maths and `np.` functions, worked examples (temperature, GST, distance, a speed test), broadcasting and its shape rule, `np.where`/`clip`/`any`/`all`, aggregation (`median`, `std`, `var`, `prod`, `percentile`), `axis` and `keepdims`, `cumsum`/`cumprod`/`diff`, `sort`/`argsort`/`unique`, reshaping (`ravel`, `newaxis`, `squeeze`), joining and splitting (`concatenate`, `vstack`, `hstack`, `split`), random numbers with `default_rng` (seed, `integers` excludes the top, `choice`, `normal`, the older `np.random.seed`), a marks-analysis example with z-scores, common mistakes, practice, homework. Random boxes change every run. Printed array layout in the browser (NumPy 1.26) differs slightly from desktop NumPy 2. Title-screen code `numpy_ops.py`. The closing "Next class: Pandas basics" is the assistant guess.
18. **"Pandas Introduction"** (slug `pandas-introduction`, prefix `s18-`, 16 sections, 34 runnable boxes incl. 2 that fail on purpose + 4 empty practice boxes): what pandas is, Series (index, name, from dict, `loc`/`iloc`, label slices include the end, maths and filters, alignment by label), DataFrame (from dict of lists, list of dicts, list of lists with `columns=`, NumPy array, Series together, `shape`/`columns`/`index`/`dtypes`), generating data (`range`, random, `date_range`, `read_csv` from `StringIO`, `to_csv`), `head`/`tail`/`describe`, selecting columns and rows (`[]` vs `[[]]`, `loc`/`iloc`, boolean filters), adding/renaming/dropping columns and `sort_values`, `set_index`/`reset_index`, missing values (`isna`, `fillna`, `dropna`), a class-report example, common mistakes, practice, homework. pandas needs the browser package loaded (`TryIt.tsx` and the PDF script load it from the imports); the first pandas box downloads more than numpy. Printed dtype/object vs str wording differs in newer pandas, so the lesson only mentions it in a note. Title-screen code `students.py`. The closing "Next class: Pandas data analysis" is the assistant guess.

## Slides (Lesson.tsx)

- `toBands()` turns sections into slides: the content before the first `h3` is one slide titled with the section name; every `h3` starts a new slide (its title is the slide title, the section name becomes a small label).
- **Title screen (slide 0)** is a full-screen dark hero (`.notes-hero`, same navy, blue, violet and green glows as the landing page, plus a faint dot grid). Left: a "Python for beginners" chip, the lesson title with the word "Python" (if present) in a yellow-to-green gradient, the summary, fact pills (slide count and number of runnable code boxes, computed from `content.ts`, plus the lesson's optional `tag`) and a yellow "Start reading" button. Right: `HeroCode.tsx`, a code window that types the lesson's `hero` lines, then shows the output (loops every few seconds; static under reduced motion), with four floating white logo tiles (Python, Pandas, NumPy, Jupyter) placed in the side margins so they never cover the code. `.contents-head` styles are still used by the Contents page and the "Topic not found" page.
- `html.snap-page` (added while the notes page is mounted) turns on `scroll-snap-type: y mandatory`; each slide is `min-height: 100vh` with `scroll-snap-align: start`.
- Slide content fades and rises in via an `IntersectionObserver` (`.in-view`). A second observer, watching the middle line of the screen, drives the active dot and the "n / N" counter. This works even for slides taller than the screen.
- Right-edge dots jump to a slide; they are hidden under 900px.
- **Navigation:** round up/down buttons at the bottom right go to the previous/next slide (`goTo()`), disabled at the ends. Keyboard: Left/Right arrows and Home/End move between slides. Up/Down and Page keys keep their normal scrolling (the snap settles on the next slide). Key handling is ignored while typing in a textarea/input and while a picture is open.
- `sizeOf()` picks `data-size` = `xl`, `l` or `m` from how much text a slide has. Short slides get bigger type (`--scale` 1.5 / 1.2 / 1) so they fill the screen. Slides containing code or a table always stay `m`.
- Each slide gets one of 8 soft background colours with a matching accent (blue, green, orange, purple, pink, teal, amber, indigo), cycling with `.band:nth-of-type(8n + k)`. The accent colours the eyebrow, title bar, bullets, bold text, table headers, code-block header and callout borders.
- Bold text is the slide's accent colour at heavier weight, with no highlight strip (the strip was tried and rejected).

## Try it: Python in the browser (TryIt.tsx)

- Any `code` block with `runnable: true` renders as an editable textarea with **Run** and **Reset** buttons and an output panel. Every lesson uses them (about 150 boxes in total).
- Python runs client-side with **Pyodide 0.26.4** (WebAssembly), loaded from `cdn.jsdelivr.net` the first time someone presses Run (a few MB; shows "Loading Python…"). Nothing is installed through npm and nothing runs on a server. If the user is offline the box shows "Could not load Python. Check your internet connection."
- stdout and stderr are captured raw (`setStdout({ write })`, decoded with a `TextDecoder`) and `sys.stdout` is flushed after every run. Capturing line by line (`batched`) lost text without a newline: `print(i, end=" ")` printed nothing, and the text then appeared in the next box's output. Do not switch back to `batched`. The output panel shows what was captured; errors show only the traceback from the learner's own code onward (the Pyodide internal frames above it are cut, and `<exec>` is renamed "your code"), so the learner sees the line number and the error type, drawn in red.
- Packages such as **numpy** and **pandas** are fetched on the first run: `TryIt.tsx` and the PDF script call `py.loadPackagesFromImports(code)` before running. The browser Python is 32-bit, so a default whole-number array shows `int32` there instead of `int64`; lesson 16 warns about it and its examples ask for `dtype=` when it matters.
- Tab inserts 4 spaces; Ctrl/Cmd+Enter runs the code. The editor does not wrap long lines (`wrap="off"`). The Pyodide version is the constant `PYODIDE_VERSION` at the top of the file.
- `input()` is not supported in this box.

## Drawing tools (Draw.tsx)
- A small "Draw" panel (starts collapsed on the right) can be dragged anywhere by its header; it stays on screen and remembers its position (`localStorage` key `draw-pos`). The + / - button expands it. **Pen** draws on top of the page; strokes are stored in page coordinates so they scroll with the lesson. **White screen** opens a full-screen white board with its own drawing. Both have the same tools (below), 6 colours, 3 sizes, undo (button or Ctrl+Z) and clear. Esc leaves the pen or closes the board. **Tools:** Pen, Marker, Rub out (pixel eraser), Remove (click a drawing to delete just that one item), Line, Arrow, Box, Circle, Text (click and type; Enter finishes, Shift+Enter is a new line; size follows the size buttons), Select (click an item to move it, Delete removes it, double-click text to edit it). **Select also picks the code shown on the board:** drag it anywhere, and use the 🔍− / 🔍+ / Center buttons in the panel (or the mouse wheel with Select) to zoom it or put it in the middle of the screen. With a drawn item picked, the same buttons and wheel zoom or centre that item instead (`scaleItem`, `scaleCode`, `center` in `Draw.tsx`). The code block's position and zoom are a CSS transform (`codeT`), reset each time the board opens; they are not part of Undo. Drawings are stored as items (free strokes, shapes, text), not pixels, which is what makes Remove, Select and multi-step Undo possible; the code is in `Draw.tsx` (`Item`, `hit()`, `paint()`). Drawing is not saved (reload clears it) and is hidden when printing.
- Canvases are `position: fixed` (class `draw-layer`, z-index 90/95, toolbar 110); only `.live` canvases take pointer events, so the lesson stays usable when the pen is off.

- Every code box (runnable or not) has a **⬜ Board** button. It calls `openBoard(code, label)` from `Draw.tsx` (a `open-board` window event), which opens the white screen with that code shown large on the left, ready to draw on. For Try it boxes it sends the current (edited) code. Opening it clears the board's old strokes.

## Slide pictures (Art.tsx and src/slides/)

Under each slide title (left column) there can be a picture. The left column is sticky, so the picture stays visible while a tall slide scrolls.

- **Drawn illustrations: only slides 1 and 2 of lesson 1.** "What is Python?" (`hello-bubble`: Python logo plus a `print("Hello, World!")` speech bubble) and "What Python is used for" (`uses`: four labelled tiles with the Pandas, TensorFlow, Django and Bash logos). They are chosen in `content.ts` with `art: 'name'` on a section or on an `h3` block, and drawn by `Art.tsx`. The owner asked to remove the other illustrations that had been drawn (installer window, terminals, editor, timeline, notebook, error cards, and so on), so do not re-add them unless asked.
- **The owner's own pictures (preferred).** Drop a file into `src/slides/` named after the slide id, with extension png, jpg, jpeg, webp, gif, svg or avif, for example `installation-windows.png`. `Art.tsx` finds it with `import.meta.glob('./slides/*.{...}', { eager: true, query: '?url' })`, so Vite hashes it and adds the base path for GitHub Pages. A picture overrides a drawn illustration on the same slide. `src/slides/README.md` lists the slide ids of lesson 1 and explains the rule for later lessons; sub-slide id = `<section id>-<h3 title lowercased, non-alphanumerics to dashes, trimmed>`. To list every id, check the section `id` values in `src/content.ts`.
- Pictures render in `.art-image`: natural proportions, at most the column width (about 520px) and 52vh tall (never stretched, no white frame), with **square corners** (the owner does not want rounded corners on pictures; `border-radius: 0` on `.art-image`, `.art-zoom` and the lightbox image) and an accent-tinted shadow. Never set both a width and a max-height of 100% on a picture: it would stretch; use `width: auto` with `max-width` and `max-height` on wide screens.
- **Several pictures on one slide.** Name them `<id>.webp` (first), `<id>-2.webp`, `<id>-3.webp`, and so on; they stack top to bottom in the left column (`picturesFor()` in `Art.tsx`). With more than one (`.art-multi`), each is capped at about 34vh tall on wide screens, which is enough for them to fill the left column while both still fit on screen under the title; a single picture can be up to 52vh. On narrow screens (900px and below) pictures use the full width of the slide (up to 640px) and several pictures sit side by side in two columns.
- **Pictures in use:** `src/slides/history.webp` on the History slide: a "Guido van Rossum, Creator of Python" info card supplied by the owner (landscape, about 170 KB). A second picture, `src/slides/history-2.webp` (a Monty Python's Flying Circus collage, 1448x1086, about 315 KB), sits below it, matching the "name comes from Monty Python" sentence. The owner's originals are `Images/Guido van Rossum_ Python’s Creator.png` and `Images/Monty Python Flying Circus Collage.png` (about 2 MB each, 1448x1086, committed by the owner); they were converted to WebP (same size, quality 0.85) because WebP is much smaller. Lessons 2 to 7 have no pictures yet.
- **Click to zoom.** A slide picture from `src/slides/` is wrapped in `Zoomable` (in `Art.tsx`): clicking it opens a full-screen overlay (`.lightbox`) with the picture centred, scaled to at most 94% of the screen, over a dark blurred backdrop. Click anywhere, press Esc, or use the round close button to close. The overlay is rendered with `createPortal` into `document.body`: the left column is `position: sticky`, which creates its own stacking context, so an overlay left inside it stayed below the slide counter and arrow buttons. Do not move it back inside the slide. The drawn illustrations are not zoomable.
- **Converting images to WebP:** no image library is installed (no sharp, no Pillow) and npm may be offline, so the conversion was done in headless Chrome: load the image from the dev server (same origin, so the canvas is not tainted), draw it on a canvas, and `canvas.toDataURL("image/webp", 0.85)`. Use the same approach for new pictures, or any online converter. Keep pictures under about 300 KB each. (In Git Bash, a path argument starting with `/` is rewritten to a Windows path; set `MSYS_NO_PATHCONV=1` or avoid the leading slash.)

## Session PDFs (`Notes pdf/`)

Printable notes for each session live in `Notes pdf/` (committed): `Session N - <title>.pdf`. Generate or refresh one with `node --experimental-strip-types scripts/notes-pdf.mjs <session number or lesson slug>`.

- **How it works.** `scripts/notes-pdf.mjs` reads the lesson from `src/content.ts` (session N = the Nth lesson in the `lessons` array), builds a styled A4 HTML page (coloured title block, one colour per section like the website, code blocks with outputs, tables, tip and warning boxes, page numbers in the footer) and prints it to PDF with headless Chrome over the DevTools protocol. No packages are installed. Set `CHROME_PATH` if Chrome is not at the usual Windows path.
- **Pictures.** For each section and sub-section, the script looks in `src/slides/` for a file named after the slide id (`<id>.webp`, `<id>-2.webp`, ...), the same files the website shows, and puts them under that heading (side by side when there are two). They are shrunk to at most 1100px wide JPEG in the page before printing, which keeps a PDF with two pictures under 1 MB (unshrunk it was 5 MB). The drawn illustrations of lesson 1 are not images, so they are not in the PDF.
- **Real outputs.** Every `runnable` code block that has no stored `output` is run inside the page with Pyodide (loaded from the CDN, so **generating a PDF needs an internet connection**) and its real output (or the error) is printed under it, so the PDF shows what each example does. Blocks whose label starts with "Work out" or "Your turn" are left without output on purpose, because they are exercises. If Pyodide cannot load, the script prints a warning and makes the PDF without outputs. The page script lives inside a template literal in `notes-pdf.mjs`, so every backslash in it is doubled (`\\n`); a single backslash silently breaks the whole script.
- **What is not in the PDF:** the interactive "Try it" boxes become ordinary code blocks (with their output added as above), and the website's slide layout, title-screen animation and zoom are not reproduced.
- **Previewing without a PDF viewer.** Set `NOTES_PREVIEW=<path prefix>` and the script also saves `<prefix>_1.png`, `<prefix>_2.png`, ... (A4-sized pictures of the page). The real PDF page breaks can differ slightly (the preview ignores the page margins).
- **Current PDFs:** sessions 1 to 18, 280 to 730 KB each (session 1 is the biggest because it carries the two History pictures). Sessions 2 to 18 have no pictures, because the owner has not added any for them; if pictures are added to `src/slides/`, regenerate the PDF.
- If a lesson is edited after its PDF was made, regenerate that PDF. **Exception right now:** the owner is correcting lessons one by one and asked for no PDF regeneration until they say they have finished, so the **Session 3 PDF is out of date** (it lacks the per-method boxes). Do not regenerate it until the owner says so; then run `notes-pdf.mjs 3` (and any other session they edited).

## Session quizzes (`Quiz in CSV/`)

One multiple-choice quiz per session, as a CSV file, ready to import into the owner's quiz app: `Quiz in CSV/Session N - <title>.csv` (committed).

- **The template.** The owner supplied `quiz-template.csv` in the project root (committed). **Open it before touching the quiz files**: the files must look exactly like it. It starts with a UTF-8 BOM, uses CRLF line endings, and puts **every field in double quotes**, including empty ones (`""`). Its sample rows show that `Correct` may be a letter, a number 1 to 6 or the exact text of the right option (its true/false row uses the text `True`); this project always writes the letter. The first version of the quiz files was built from the written description only, without the template, and had no BOM and unquoted fields; it was corrected after the owner asked.
- **Format (the owner's required format).** One row is one question. Columns, in this order: `Question`, `Option A`, `Option B`, `Option C`, `Option D`, `Option E`, `Option F`, `Correct`, `Explanation`. Each question has 2 to 6 options (unused option cells are empty). `Correct` holds the **letter** (A to F) of the right option. The students see the options in a random order, so the order in the file does not matter. Questions per session: between 5 and 50, enough to cover every topic of the session.
- **Current files and sizes:** Session 1 (35 questions), Session 2 (37), Session 3 (49), Session 4 (36), Session 5 (39), Session 6 (36), Session 7 (45), Session 8 (49), Session 9 (50), Session 10 (47), Session 11 (47), Session 12 (43), Session 13 (50), Session 14 (49), Session 15 (49), Session 16 (45), Session 17 (50), Session 18 (49): 805 in total. Almost all have 4 options; a few have 2 (true or false) or 5.
- **Where the questions live.** `scripts/quiz-data/sN.mjs` (one file per session) holds the questions as arrays: `[question, right answer, [wrong answers], explanation, optionalPython]`. `scripts/quiz-csv.mjs` turns them into the CSV files (`node --experimental-strip-types scripts/quiz-csv.mjs`, optionally with a session number).
- **What the script does.** It places the right answer on the least-used letter so far (ties broken with a seeded random generator, so the same input always gives the same file) and shuffles the wrong answers around it, so the correct letters are evenly spread (A, B, C and D each about a quarter). It checks: 2 to 6 options, no duplicate or empty options, no duplicate questions, an explanation on every row, and **ASCII characters only** (no curly quotes or symbols, to avoid encoding problems when importing). The file is written like the template: BOM, CRLF line endings, every field quoted (a quote inside a field is doubled).
- **Every output answer is verified.** If a question has the fifth element (Python code), the script runs it with the local `python` and fails unless its printed output equals the right answer exactly. Use the `flat(code)` helper (defined at the top of s5 to s7) when the code prints several lines: it prints them on one line separated by spaces. A check must print the answer **text**; do not add code to questions whose answer is a line of code or an explanation. Questions describe code in one line (the CSV cells have no line breaks); the real multi-line code lives only in the check. The local Python is 3.10 while the site runs 3.14; avoid features that differ.
- **Writing rules for questions.** Cover every topic of the lesson; mix concept questions with "what does this print?"; wrong answers must be plausible (typical beginner mistakes), never "all of the above" or "both A and B" (the options are shuffled). Keep to ASCII. Write a one-sentence explanation that teaches why.
- **Adding or editing.** Edit `scripts/quiz-data/sN.mjs`, run the script, check that it reports no errors, and commit the CSV together with the data file. A new session needs a new `sN.mjs`. The script reads the session title from `src/content.ts`, so the file name follows the lesson order.
- Pitfall seen while writing: a stray expression after a check (for example `&& undefined`) silently disables or changes the check. The checks must be plain strings of Python.

## Mobile (phones and small tablets)

The whole site is built to work on a phone (tested at 390x844, 360x740 and 820x1180 with touch emulation: no sideways scrolling on any page). The rules live in the **last blocks of `index.css`** ("phones and small tablets", at 900px and 700px/420px breakpoints):

- **Grid columns use `minmax(0, 1fr)`** (`.hero-grid`, `.band-inner`). A plain `1fr` lets wide code, tables or long words push the column wider than the screen and makes the whole page scroll sideways. `.topic-grid` uses `minmax(min(100%, 380px), 1fr)` for the same reason. `html, body` also get `overflow-x: hidden` on small screens as a safety net.
- **Slides become ordinary sections** on phones: `min-height: auto`, `scroll-snap-type: y proximity` (mandatory snapping fights with slides taller than a phone), and the title screen uses `100svh`.
- **Type sizes are fixed rem values** on phones (body 1.1rem, slide titles 2.1rem, code 0.9rem, tables 0.92rem) instead of the vw/vh formulas used on desktop.
- **Code boxes** do not wrap long lines (`wrap="off"`, `white-space: pre`); they scroll sideways. Tables scroll sideways inside `.table-wrap`.
- **Floating controls are hidden at 700px and below:** the slide counter and the up/down buttons covered the text. Swiping is the navigation on phones (the dots are hidden at 900px and below).
- **Landing logos:** see "Random logo placement" (the middle band stays free on phones).
- To check a change on a phone: emulate a mobile device in Chrome DevTools, or in a script call `Emulation.setDeviceMetricsOverride` with `mobile: true`, and compare `document.documentElement.scrollWidth` with `clientWidth` (they must be equal).

## Code font: no ligatures

The code font (JetBrains Mono) turns `>=`, `!=` and `==` into single symbols. Learners must see exactly what they type, so `index.css` ends with a rule that switches ligatures and contextual alternates off for every element (`font-variant-ligatures: none` and `font-feature-settings: 'liga' 0, 'calt' 0`, both `!important` on `*`). The `!important` on `*` is needed because the `font:` shorthand used all over the code styles resets these properties. Do not remove it.

## Styling notes

- Landing page palette: vivid navy (`#0a1a3f` to `#060e24`) with a bright blue centre glow, a violet glow at the top right and a green glow at the bottom; pure white logo tiles; green accent `#2ee38a`; snake greens. Yellow appears in the favicon and on the notes title screen's "Start reading" button.
- Contents and notes pages are light: white page, dark navy text.
- Type scales with the screen using `clamp()` with `vw` and `vh` terms. Sizes are large on purpose; the owner repeatedly asked for bigger fonts and less empty space.
- `index.css` is layered: later blocks intentionally override earlier ones (for example "section bands", "fill the slide", "short slides"). When changing a style, search for every rule that targets the same selector and edit the last one, or the change will appear to do nothing.
- Tables use small text and tight cells so long ones fit on one screen.
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
4. Added floating data-analyst icons (replaced in steps 11 and 12).
5. Added the Contents page (grid, one topic) and a small custom router, because the network was down and `wouter` could not be installed.
6. Added the notes page from the pasted lesson, without timings, then iterated: removed the "On this page" menu, switched to a white, 1450px-wide layout, bigger fonts, more colour.
7. Rebuilt the notes as per-sub-topic colour bands, then as full-screen scroll-snap slides with dots and a counter; added size-by-content scaling and bold key phrases; replaced the bold highlight strip with accent-coloured bold.
8. Pushed to GitHub and set up GitHub Pages with the base-path-aware router and the 404 fallback.
9. Landing page edit: replaced the 3D chrome "Python" text with a flat 2D title and removed the title's mouse interaction. Deleted the now-unused 3D font file.
10. Added slide navigation (Prev/Next buttons, Left/Right/Home/End keys) and the in-browser "Try it" Python runner (Pyodide).
11. Landing page: replaced the data-analyst icon glyphs with real programming-language logo SVGs (10 languages) on white tiles.
12. Landing page logos changed again: only Python data-science and analysis tools. Removed the other language logos.
13. Rebuilt the snake: smooth instanced body with a diamond-back pattern, slithering wave, proper head with eyes and a flicking forked tongue (it used to look like a worm).
14. Snake made bigger (150 segments, radius 0.85, head 1.65x) and it now chases the mouse cursor, wandering again after 3.5 s of idle.
15. Snake now slithers in front of the title (layer order change) and eats the floating logo tiles on contact; they pop and respawn after 2.5 s.
16. Logo tiles appear at random places on every visit and respawn at a new random place after being eaten (`placement.ts`).
17. Colour fix: the vignette was moved behind the content (it had been greying out tiles, snake and button) and the background was made more vivid.
18. Notes: added Windows terminal install commands (winget) as their own slide, a `py` launcher tip and a Microsoft Store alias fix.
19. Notes: added a VS Code terminal install slide (winget, extension, practice folder) and a `code` not-recognised fix.
20. Slide pictures: tried drawn illustrations on every slide, then, at the owner's request, kept only slides 1 and 2 and added the `src/slides/` folder so the owner can supply their own images per slide (named after the slide id).
21. History slide now shows the owner's Guido van Rossum picture (converted from PNG to WebP); picture frames hug the image.
22. Click-to-zoom lightbox for slide pictures; History picture replaced by the owner's updated landscape version.
23. History slide got a second picture (Monty Python collage); slides can have several stacked pictures via `<id>-2`, `<id>-3` file names.
24. Slide pictures: square corners, fill the column on wide screens, full width / two columns on narrow screens.
25. Notes title screen redesigned: dark vivid hero with a typing code window, floating tool logos, fact pills and a yellow call-to-action.
26. Added lesson 2, "Variables and Data Types"; per-lesson `hero` code and `tag` on the title screen; the Try it error output shows only the learner's line and the error type.
27. Added lesson 3, "Strings and Operators". Tables got smaller text and tighter cells; ordered lists accept `start`; table rows use index keys.
28. Mobile pass: no sideways scrolling anywhere, fixed phone type sizes, slides as normal sections on phones, Contents cards fit the width, landing logos avoid the title, code boxes scroll instead of wrapping, floating counter and arrows hidden on phones.
29. Session 1 PDF created in `Notes pdf/` (with the History pictures) using the new `scripts/notes-pdf.mjs`; new owner rules: ask before creating any session notes, PDFs per session in `Notes pdf/`, include pictures.
30. Session 2 and Session 3 PDFs created in `Notes pdf/` at the owner's request.
31. Added lesson 4, "Conditional Statements", and its PDF; turned off code ligatures site-wide; rule 7 about the draft-then-review flow.
32. Added lesson 5, "Loops", and its PDF; fixed Try it losing output printed with `end=" "`.
33. Added lessons 6 ("Loop Practice") and 7 ("Lists") with their PDFs. The PDF script now runs every runnable example and prints its real output; all seven PDFs were regenerated. Fixed stray backticks inside bold text in the notes.
34. Quiz CSV files created for all seven sessions in `Quiz in CSV/` (277 questions) with `scripts/quiz-csv.mjs` and the question lists in `scripts/quiz-data/`; every "what does this print" answer is checked by running Python.
35. Quiz files rebuilt to match `quiz-template.csv` exactly (UTF-8 BOM, every field quoted); the template is now committed.
36. Agent.md reorganised: lessons 5 to 7 moved into "Current lessons", the Contents page described as a seven-card grid, slide notes moved out of the Try it section, a Commands and File map refresh, rule 10 added, and the note about `Images/` corrected (the owner committed them in commit `1972bd2`).
37. Added lesson 8, "Tuples and Sets", with its PDF and a 49-question quiz CSV. The owner said "no need to ask just do it", so it was built and published in one go (no review round); when the owner says that, do the same for later sessions.
38. Added lesson 9, "Dictionaries", with its PDF and a 50-question quiz CSV (published in one go, as for lesson 8).
39. Added lesson 10, "Revision and Mini Project" (marks manager and contact book), with its PDF and a 47-question quiz CSV.
40. Added lesson 11, "Functions", with its PDF and a 47-question quiz CSV.
41. Added lesson 12, "Advanced Functions", with its PDF and a 43-question quiz CSV.
42. Renamed the example student "Riya" to "Ankit" in lessons 7 to 12, the quiz data and CSVs for sessions 9, 10 and 12, and regenerated the PDFs for sessions 7 to 12.
43. Added drawing tools (`Draw.tsx`): pen on the page and a white screen, for explaining code in a dry run.
44. Added a "Board" button to every code box: shows the code on the white screen to draw over while explaining.
45. Locked sessions 4 to 12 on the website (`src/lock.ts`, `LOCK_FROM = 4`): greyed cards with a lock on Contents, and a locked message if the URL is opened directly. Change `LOCK_FROM` to unlock sessions as classes happen. New lessons added after it (13 to 18) are locked automatically, because `LOCK_FROM` is a "from here to the end" number. The notes are still in the JS bundle, so this hides them but is not a security lock; PDFs and quiz CSVs in the repo are not affected.
46. Added lesson 13, "Modules and Packages", with its PDF and a 50-question quiz CSV.
47. Added lesson 14, "File Handling", with its PDF and a 49-question quiz CSV.
48. Added lesson 15, "Exception Handling", with its PDF and a 49-question quiz CSV.
49. Added lesson 16, "NumPy Basics", with its PDF and a 45-question quiz CSV. Also: Try it and the PDF script now load numpy (`loadPackagesFromImports`), and `**bold with `code` inside**` now renders properly on the site and in the PDFs; PDFs for sessions 2 to 4 and 6 to 15 were regenerated because of that.
50. Added lesson 17, "NumPy Operations", with its PDF and a 50-question quiz CSV.
51. Added lesson 18, "Pandas Introduction", with its PDF and a 49-question quiz CSV. `TryIt.tsx` now shows the loading hint for pandas as well as numpy.
52. Unlocked session 4 on the website (`LOCK_FROM = 5`): sessions 1 to 4 are open, sessions 5 to 18 stay locked. To open the next class, raise `LOCK_FROM` by one.
53. Lesson 3: every row of the three string-method tables now shows its result (`gives ...`), the missing `title`, `capitalize`, `strip`, `lstrip`, `rstrip` examples were added (`lstrip` and `rstrip` split into two rows), and two new Try it slides were added (cleaning the text, searching and checking). Session 3 PDF regenerated.
54. Lesson 3: every string method now has its own small Try it box (one idea per box, labelled with the method) on slides grouped by method: `upper`/`lower`, `title`/`capitalize`, `strip`/`lstrip`/`rstrip`, `replace`, `find`/`count`, `startswith`/`endswith`, `isdigit`/`isalpha`, `split`, `join`. Replaced the two combined boxes added in item 53. **The owner asked not to regenerate PDFs until they finish correcting the lessons, so the Session 3 PDF is stale until they say so** (regenerate it then with `notes-pdf.mjs 3`).
55. Deleted 16 stray preview pictures (`1_1.png` to `1_16.png` in the repo root, accidentally committed with lesson 16 from a `NOTES_PREVIEW` run) and ignored that name pattern in `.gitignore`. Kept `Images/` (the owner's originals) and the pictures in use (`src/slides/`, `public/`). When using `NOTES_PREVIEW`, save the pictures in a temp folder, not the repo.
56. Drawing tools: added shapes (line, arrow, box, circle), a text tool, a select tool (move, delete, edit text), a remove-one-item eraser and multi-step undo; the panel is wider (216px) with a tool grid. Tested in headless Chrome (draw each shape, type text, move a box, remove a circle).
57. Board code can now be selected with the Select tool, dragged, zoomed in or out (buttons or mouse wheel) and centred; the same zoom and centre work on a picked drawing, text or shape. Tested in headless Chrome (drag, zoom in three times, centre, wheel out, zoom out).

## Gotchas and lessons learned

- **Base path:** any file loaded at runtime from `public/` must use `import.meta.env.BASE_URL + 'path'`, never a bare `/path`, or it breaks on GitHub Pages.
- **three.js fonts:** `three@0.186` no longer ships `examples/fonts`. If 3D text is ever needed again, download a typeface JSON (for example from three r160) into `public/`.
- **Shell escaping:** creating files with Bash heredocs or `node -e` mangled template literals (`${...}` was expanded by the shell) and regex backslashes, more than once. Write source files and helper scripts with the editor/Write tool instead; use shell only for simple commands. A `rm` inside a shell loop with a variable is blocked by the safety check; delete explicit file paths instead.
- **No network at times:** `npm install` can fail with `ENOTFOUND registry.npmjs.org`. Prefer not adding dependencies for small things (the router, the PDF script and the quiz script all use no packages).
- **Dev port:** `npm run dev` says `localhost:5173`, but if that port is taken Vite picks the next one; always read the printed URL.
- **Stale browser view:** after large CSS or dependency changes the dev page can show an old version; hard-refresh with Ctrl+Shift+R.
- **Tall slides:** with `scroll-snap-type: mandatory`, a slide taller than the screen scrolls inside itself before snapping on. Keep slide content reasonably short, or split it with an `h3`.
- **`font:` shorthand resets font features.** Any `font-variant-*` or `font-feature-settings` set on an ancestor is wiped by a later `font:` shorthand (see "Code font: no ligatures").
- **Sticky creates a stacking context.** Anything that must cover the whole page (the picture lightbox) has to be portalled to `document.body`.
- **Testing visually without a browser extension:** drive headless Chrome over the DevTools protocol (a small Node script with the built-in `WebSocket`): navigate, `scrollIntoView` a slide, click, `Page.captureScreenshot`. `--virtual-time-budget` screenshots do not follow `#hash` scrolling in this SPA. On Windows, Chrome's temp profile folder can stay locked for a moment after it exits; deleting it must not be fatal.
- **Line endings:** git warns that LF will become CRLF on Windows. This is harmless.
- **Typecheck:** run `npx tsc -b` after every change; it has been clean throughout.
- **Testing the drawing tools:** start `npm run dev` (it moves to the next free port, for example 5174, if 5173 is busy, so read the URL it prints), then drive headless Chrome over the DevTools protocol: open a lesson, click a `.try-reset[title*="white screen"]` button, click the `.draw-tool` buttons by their label, send `Input.dispatchMouseEvent` drags on the canvas and `Input.insertText` for text, then screenshot. Stop the dev server afterwards. Save screenshots in the scratchpad, never in the repo.

## Open items and ideas

- Not yet done: a quiz **on the website** (the quizzes exist only as CSV files for the owner's own quiz app), a progress bar and remembering the last slide read, a per-slide share link (slides already have anchor ids, e.g. `#installation-windows`), and `input()` support in the Try it box.
- Suggested next: make the Try it box check answers (for example expect a given output) so Practice can say "correct"; pictures for sessions 2 to 7 (the owner can drop files into `src/slides/`).
- The JS bundle is about 820 kB (mostly three.js). Code-splitting the landing scene with a dynamic `import()` would speed up the Contents and notes pages.
- The brand name "PyJourney" and the lesson copy were written by the assistant; change them freely.
