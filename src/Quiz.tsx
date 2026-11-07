import { useEffect, useRef, useState } from 'react'

// A quiz question in scripts/quiz-data/sN.mjs: [question, right answer, [wrong answers], explanation, optional check code]
type Question = [string, string, string[], string, string?]

// The question files load only when a quiz slide needs them, so they stay out of the main bundle.
const banks = import.meta.glob<{ default: Question[] }>('../scripts/quiz-data/s*.mjs')

const shuffle = <T,>(items: T[]) => {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// Questions already shown on this visit, so two quiz slides in a lesson do not repeat one another.
const asked = new Map<number, Set<string>>()

function pick(session: number, all: Question[], progress: number): Question {
  // the files follow the order of the lesson, so stay in the part already taught
  const taught = all.slice(0, Math.max(5, Math.ceil(all.length * progress)))
  const seen = asked.get(session) ?? new Set<string>()
  asked.set(session, seen)
  let fresh = taught.filter((q) => !seen.has(q[0]))
  if (!fresh.length) {
    seen.clear()
    fresh = taught
  }
  const q = fresh[Math.floor(Math.random() * fresh.length)]
  seen.add(q[0])
  return q
}

type Shown = { question: string; right: string; why: string; options: string[] }
const show = (q: Question): Shown => ({ question: q[0], right: q[1], why: q[3], options: shuffle([q[1], ...q[2]]) })

export default function Quiz({ session, progress }: { session: number; progress: number }) {
  const [all, setAll] = useState<Question[] | null>(null)
  const [current, setCurrent] = useState<Shown | null>(null)
  const [choice, setChoice] = useState<string | null>(null)
  const [score, setScore] = useState({ right: 0, tried: 0 })
  const [failed, setFailed] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let live = true
    const load = banks[`../scripts/quiz-data/s${session}.mjs`]
    if (!load) {
      setFailed(true)
      return
    }
    load()
      .then((m) => {
        if (!live) return
        setAll(m.default)
        setCurrent(show(pick(session, m.default, progress)))
      })
      .catch(() => live && setFailed(true))
    return () => {
      live = false
    }
  }, [session, progress])

  // keyboard, for class: A to F answer the quiz on screen, Enter or N moves to the next question
  useEffect(() => {
    if (!all || !current) return
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.repeat) return
      if ((e.target as HTMLElement).closest('textarea, input, select') || document.querySelector('.draw-board, .draw-text')) return
      const rect = box.current?.getBoundingClientRect()
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight * 0.75) return // another slide is on screen
      const key = e.key.toLowerCase()
      const index = 'abcdef'.indexOf(key)
      if (key.length === 1 && index >= 0 && index < current.options.length && !choice) {
        e.preventDefault()
        const picked = current.options[index]
        setChoice(picked)
        setScore((s) => ({ right: s.right + (picked === current.right ? 1 : 0), tried: s.tried + 1 }))
      } else if (choice && (key === 'enter' || key === 'n')) {
        e.preventDefault()
        setChoice(null)
        setCurrent(show(pick(session, all, progress)))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [all, current, choice, session, progress])

  if (failed) return <p>This quiz could not be loaded. Check your internet connection and reload the page.</p>
  if (!all || !current) return <p>Loading a question…</p>

  const answer = (o: string) => {
    if (choice) return
    setChoice(o)
    setScore((s) => ({ right: s.right + (o === current.right ? 1 : 0), tried: s.tried + 1 }))
  }
  const next = () => {
    setChoice(null)
    setCurrent(show(pick(session, all, progress)))
  }
  const state = (o: string) => {
    if (!choice) return ''
    if (o === current.right) return ' right'
    return o === choice ? ' wrong' : ' dim'
  }

  return (
    <div className="quiz" ref={box}>
      <p className="quiz-q">{current.question}</p>
      <div className="quiz-options">
        {current.options.map((o, i) => (
          <button type="button" key={o} className={'quiz-option' + state(o)} onClick={() => answer(o)} disabled={!!choice}>
            <b>{'ABCDEF'[i]}</b>
            <span>{o}</span>
          </button>
        ))}
      </div>
      <div className="quiz-foot" aria-live="polite">
        {choice && (
          <p className="quiz-why">
            <strong>{choice === current.right ? '✓ Correct.' : `✗ The answer is: ${current.right}.`}</strong> {current.why}
          </p>
        )}
        <div className="quiz-actions">
          <span>
            {score.tried ? `${score.right} of ${score.tried} right` : 'Pick an answer'}
            <small className="quiz-keys">{choice ? ' · press Enter for the next one' : ` · or press A to ${'ABCDEF'[current.options.length - 1]}`}</small>
          </span>
          <button type="button" className="quiz-next" onClick={next}>{choice ? 'Next question →' : 'Different question'}</button>
        </div>
      </div>
    </div>
  )
}
