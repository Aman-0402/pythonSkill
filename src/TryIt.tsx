import { useState } from 'react'

// Python runs in the browser through Pyodide (WebAssembly), loaded from a CDN on first use.
const PYODIDE_VERSION = '0.26.4'
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

type Pyodide = {
  runPythonAsync(code: string): Promise<unknown>
  setStdout(o: { batched: (s: string) => void }): void
  setStderr(o: { batched: (s: string) => void }): void
}

declare global {
  interface Window {
    loadPyodide?: (o: { indexURL: string }) => Promise<Pyodide>
  }
}

let pyodide: Promise<Pyodide> | null = null

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

type Result = { text: string; error: boolean }

export default function TryIt({ code, label }: { code: string; label?: string }) {
  const [source, setSource] = useState(code)
  const [result, setResult] = useState<Result | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'running'>('idle')

  const run = async () => {
    const lines: string[] = []
    try {
      setStatus(pyodide ? 'running' : 'loading')
      const py = await loadPython()
      setStatus('running')
      py.setStdout({ batched: (s) => lines.push(s) })
      py.setStderr({ batched: (s) => lines.push(s) })
      await py.runPythonAsync(source)
      setResult({ text: lines.join('\n') || '(no output)', error: false })
    } catch (e) {
      // keep only the useful tail of the traceback: the line number and the error type
      // Pyodide adds its own internal frames first; start from the learner's code ("<exec>") and rename it.
      const all = (e instanceof Error ? e.message : String(e)).trim().split('\n')
      const from = all.findLastIndex((l) => l.includes('File "<exec>"'))
      const msg = (from >= 0 ? all.slice(from) : all.slice(-4)).join('\n').replace('File "<exec>"', 'File "your code"')
      setResult({ text: [...lines, msg].join('\n'), error: true })
    } finally {
      setStatus('idle')
    }
  }

  const busy = status !== 'idle'

  return (
    <figure className="codeblock try">
      <figcaption>
        <span>{label ?? 'Try it'}</span>
        <span className="try-actions">
          <button type="button" className="try-reset" onClick={() => { setSource(code); setResult(null) }} disabled={busy}>
            Reset
          </button>
          <button type="button" className="try-run" onClick={run} disabled={busy}>
            {status === 'loading' ? 'Loading Python…' : status === 'running' ? 'Running…' : '▶ Run'}
          </button>
        </span>
      </figcaption>
      <textarea
        className="try-editor"
        value={source}
        spellCheck={false}
        aria-label="Python code you can edit and run"
        rows={Math.max(3, source.split('\n').length)}
        onChange={(e) => setSource(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault()
            const el = e.currentTarget
            const { selectionStart: a, selectionEnd: b } = el
            setSource(source.slice(0, a) + '    ' + source.slice(b))
            requestAnimationFrame(() => el.setSelectionRange(a + 4, a + 4))
          } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault()
            run()
          }
        }}
      />
      {status === 'loading' && <p className="try-hint">First run downloads Python (a few MB). It is quick after that.</p>}
      {result && (
        <div className="codeblock-out">
          <span>{result.error ? 'Error' : 'Output'}</span>
          <pre className={result.error ? 'try-error' : undefined}>{result.text}</pre>
        </div>
      )}
    </figure>
  )
}
