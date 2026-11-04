import { useState } from 'react'
import { openBoard } from './Draw'

// Python runs in the browser through Pyodide (WebAssembly), loaded from a CDN on first use.
const PYODIDE_VERSION = '0.26.4'
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

type Pyodide = {
  runPythonAsync(code: string): Promise<unknown>
  setStdout(o: { write: (bytes: Uint8Array) => number }): void
  setStderr(o: { write: (bytes: Uint8Array) => number }): void
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

// Python keeps text without a newline (for example print(i, end=" ")) in its own buffer until it is flushed.
const flushOutput = (py: Pyodide) =>
  py.runPythonAsync('import sys\nsys.stdout.flush()\nsys.stderr.flush()').catch(() => undefined)

type Result = { text: string; error: boolean }

export default function TryIt({ code, label }: { code: string; label?: string }) {
  const [source, setSource] = useState(code)
  const [result, setResult] = useState<Result | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'running'>('idle')

  const run = async () => {
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
      setStatus(pyodide ? 'running' : 'loading')
      const py = await loadPython()
      setStatus('running')
      py.setStdout(capture)
      py.setStderr(capture)
      await py.runPythonAsync(source)
      await flushOutput(py)
      setResult({ text: out.replace(/\n$/, '') || '(no output)', error: false })
    } catch (e) {
      const ready = await pyodide?.catch(() => null)
      if (ready) await flushOutput(ready)
      // Pyodide adds its own internal frames first; start from the learner's code ("<exec>") and rename it.
      const all = (e instanceof Error ? e.message : String(e)).trim().split('\n')
      const first = all.findLastIndex((l) => l.includes('File "<exec>"'))
      const msg = (first >= 0 ? all.slice(first) : all.slice(-4)).join('\n').replace('File "<exec>"', 'File "your code"')
      setResult({ text: [out.replace(/\n$/, ''), msg].filter(Boolean).join('\n'), error: true })
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
          <button type="button" className="try-reset" onClick={() => openBoard(source, label)} title="Show this code on a white screen to explain it">
            ⬜ Board
          </button>
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
        wrap="off"
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
