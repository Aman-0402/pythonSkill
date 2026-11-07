import { useState } from 'react'
import { openBoard } from './Draw'
import { runPython, type PyResult } from './pyrun'

type Result = PyResult

export default function TryIt({ code, label }: { code: string; label?: string }) {
  const [source, setSource] = useState(code)
  const [result, setResult] = useState<Result | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'running'>('idle')

  const run = async () => {
    setStatus('loading')
    setResult(await runPython(source, setStatus))
    setStatus('idle')
  }

  const busy = status !== 'idle'

  return (
    <figure className="codeblock try">
      <figcaption>
        <span>{label ?? 'Try it'}</span>
        <span className="try-actions">
          <button type="button" className="try-reset" onClick={() => openBoard(source, label, { run: true, full: true })} title="Show this code full screen, run it and see the output, and draw on it to explain">
            ⛶ Full screen
          </button>
          <button type="button" className="try-reset" onClick={() => openBoard(source, label, { run: true })} title="Show this code on a white screen to explain it">
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
          {result.text && <pre className={result.error ? 'try-error' : undefined}>{result.text}</pre>}
          {result.images?.map((img, i) => (
            <img key={i} className="try-chart" src={'data:image/png;base64,' + img} alt={`Chart ${i + 1} drawn by your code`} />
          ))}
        </div>
      )}
    </figure>
  )
}
