# Your own slide pictures

Drop a picture in this folder and it replaces the drawn illustration on that slide.

**Rule:** name the file after the slide id, keep any of these extensions: `png`, `jpg`, `jpeg`, `webp`, `gif`, `svg`, `avif`.

Example: `installation-windows.png` shows on the "Windows" slide. Remove the file to get the drawn illustration back.

The picture appears under the slide title, in the left column. It keeps its proportions and is limited to the column width (about 520px) and 52% of the screen height, so portrait and landscape pictures both work. Use WebP where you can (much smaller files).

Currently in use: `history.webp` (Guido van Rossum).

## Slide ids

| File name (without extension) | Slide |
|---|---|
| `what-is-python` | What is Python? |
| `what-is-python-what-python-is-used-for` | What Python is used for |
| `what-is-python-why-it-suits-beginners` | Why it suits beginners |
| `history` | History |
| `installation-windows` | Windows |
| `installation-windows-install-from-the-terminal` | Windows: install from the terminal |
| `installation-macos` | macOS |
| `installation-linux` | Linux |
| `installation-vs-code-editor` | VS Code (editor) |
| `installation-vs-code-install-from-the-terminal` | VS Code: install from the terminal |
| `installation-common-problems` | Common problems |
| `ways-to-run-interactive-mode-repl` | Interactive mode (REPL) |
| `ways-to-run-script-mode` | Script mode |
| `ways-to-run-vs-code` | VS Code |
| `ways-to-run-jupyter-and-colab` | Jupyter and Colab |
| `first-programs` | First programs |
| `first-programs-key-points` | Key points |
| `first-programs-comments` | Comments |
| `first-programs-reading-errors` | Reading errors |
| `calculator` | Python as a calculator |
| `practice` | Practice |
| `homework` | Homework and wrap-up |

These ids come from the section ids in `src/content.ts`. If a slide title changes, its id changes too (the sub-slide ids are `<section id>-<title in lowercase with dashes>`).
