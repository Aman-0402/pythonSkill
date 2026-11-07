// Python runs in the browser through Pyodide (WebAssembly), loaded from a CDN on first use.
const PYODIDE_VERSION = '0.26.4'
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

type Pyodide = {
  runPythonAsync(code: string): Promise<unknown>
  loadPackagesFromImports(code: string): Promise<void>
  loadPackage(names: string | string[]): Promise<void>
  setStdout(o: { write: (bytes: Uint8Array) => number }): void
  setStderr(o: { write: (bytes: Uint8Array) => number }): void
}

declare global {
  interface Window {
    loadPyodide?: (o: { indexURL: string }) => Promise<Pyodide>
  }
}

let pyodide: Promise<Pyodide> | null = null
export const pythonReady = () => pyodide !== null

function loadPython(): Promise<Pyodide> {
  if (!pyodide) {
    pyodide = new Promise<Pyodide>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = PYODIDE_URL + 'pyodide.js'
      script.onload = () => window.loadPyodide!({ indexURL: PYODIDE_URL }).then(resolve, reject)
      script.onerror = () => reject(new Error('Could not load Python. Check your internet connection.'))
      document.head.appendChild(script)
    }).catch((e) => {
      pyodide = null
      throw e
    })
  }
  return pyodide
}

// Python keeps text without a newline (for example print(i, end=" ")) in its own buffer until it is flushed.
const flushOutput = (py: Pyodide) =>
  py.runPythonAsync('import sys\nsys.stdout.flush()\nsys.stderr.flush()').catch(() => undefined)

// Charts: draw with matplotlib's "agg" backend, then turn every open figure into a PNG to show under the output.
const CHART_SETUP = `import matplotlib
matplotlib.use("agg")
import matplotlib.pyplot as _plt
_plt.close("all")
_plt.show = lambda *a, **k: None`
const CHART_COLLECT = `import io, base64, json
import matplotlib.pyplot as _plt
_imgs = []
for _n in _plt.get_fignums():
    _b = io.BytesIO()
    _plt.figure(_n).savefig(_b, format="png", dpi=110, bbox_inches="tight")
    _imgs.append(base64.b64encode(_b.getvalue()).decode())
_plt.close("all")
json.dumps(_imgs)`

// openpyxl and seaborn are not bundled with Pyodide, so they are installed from PyPI (pure Python) when a box uses them.
async function installExtras(py: Pyodide, source: string) {
  const extras = [/\bopenpyxl\b/.test(source) && 'openpyxl', /\bseaborn\b/.test(source) && 'seaborn'].filter(Boolean)
  if (!extras.length) return
  await py.loadPackage(['micropip', 'numpy', 'pandas', 'matplotlib'])
  await py.runPythonAsync(`import micropip\nawait micropip.install(${JSON.stringify(extras)})`)
}

export type PyResult = { text: string; error: boolean; images?: string[] }

// Run a piece of Python and give back what it printed (and any charts, as PNG data). Never throws: errors come back in the result.
export async function runPython(source: string, onStatus?: (s: 'loading' | 'running') => void): Promise<PyResult> {
  // Raw output capture: unlike the line-by-line mode it keeps text that has no newline yet, such as print(i, end=" ").
  let out = ''
  const decoder = new TextDecoder()
  const capture = {
    write: (bytes: Uint8Array) => {
      out += decoder.decode(bytes, { stream: true })
      return bytes.length
    },
  }
  try {
    onStatus?.(pyodide ? 'running' : 'loading')
    const py = await loadPython()
    // packages such as numpy are downloaded the first time a box imports them
    if (/^\s*(import|from)\s+(numpy|pandas|matplotlib|seaborn|openpyxl)/m.test(source)) onStatus?.('loading')
    await py.loadPackagesFromImports(source)
    await installExtras(py, source)
    onStatus?.('running')
    py.setStdout(capture)
    py.setStderr(capture)
    // pandas prints a long "Pyarrow will become required" notice when it is first imported; learners do not need it
    await py.runPythonAsync('import warnings\nwarnings.filterwarnings("ignore", category=DeprecationWarning)')
    const charts = /matplotlib|seaborn/.test(source)
    if (charts) await py.runPythonAsync(CHART_SETUP)
    await py.runPythonAsync(source)
    await flushOutput(py)
    const images = charts ? (JSON.parse((await py.runPythonAsync(CHART_COLLECT)) as string) as string[]) : []
    return { text: out.replace(/\n$/, '') || (images.length ? '' : '(no output)'), error: false, images }
  } catch (e) {
    const ready = await pyodide?.catch(() => null)
    if (ready) await flushOutput(ready)
    // Pyodide adds its own internal frames first; start from the learner's code ("<exec>") and rename it.
    const all = (e instanceof Error ? e.message : String(e)).trim().split('\n')
    const first = all.findLastIndex((l) => l.includes('File "<exec>"'))
    const msg = (first >= 0 ? all.slice(first) : all.slice(-4)).join('\n').replace('File "<exec>"', 'File "your code"')
    return { text: [out.replace(/\n$/, ''), msg].filter(Boolean).join('\n'), error: true }
  }
}
