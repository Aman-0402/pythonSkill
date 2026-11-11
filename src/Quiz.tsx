import { useEffect, useRef, useState } from 'react'
import { Code } from './Highlight'

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

// Questions already shown on this visit, so the quiz slides of a lesson do not repeat one another.
const asked = new Map<number, Set<string>>()

function pickSet(session: number, all: Question[], progress: number, count: number): Question[] {
  // the files follow the order of the lesson, so stay in the part already taught
  const taught = all.slice(0, Math.max(count + 2, Math.ceil(all.length * progress)))
  const seen = asked.get(session) ?? new Set<string>()
  asked.set(session, seen)
  let fresh = taught.filter((q) => !seen.has(q[0]))
  if (fresh.length < count) {
    seen.clear()
    fresh = taught
  }
  const set = shuffle(fresh).slice(0, count)
  set.forEach((q) => seen.add(q[0]))
  return set
}

// answers such as [1, 2, 3], {'a': 1} or df.head() read better in the code font
const looksLikeCode = (o: string) => /^[[({'"]|[\w\])]\(|\w\.\w+\(|^\w+\s*=[^=]|^-?\d+(\.\d+)?$/.test(o) && !/^[A-Z][a-z]+ [a-z]/.test(o)

type Shown = { question: string; right: string; why: string; options: string[] }
const show = (q: Question): Shown => ({ question: q[0], right: q[1], why: q[3], options: shuffle([q[1], ...q[2]]) })

export default function Quiz({ session, progress, count }: { session: number; progress: number; count: number }) {
  const [all, setAll] = useState<Question[] | null>(null)
  const [set, setSet] = useState<Shown[]>([])
  const [at, setAt] = useState(0) // which question of the set is on screen; set.length means the score screen
  const [answers, setAnswers] = useState<(string | null)[]>([])
  const [failed, setFailed] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  const start = (bank: Question[]) => {
    const qs = pickSet(session, bank, progress, count).map(show)
    setSet(qs)
    setAnswers(qs.map(() => null))
    setAt(0)
  }

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
        const qs = pickSet(session, m.default, progress, count).map(show)
        setSet(qs)
        setAnswers(qs.map(() => null))
        setAt(0)
      })
      .catch(() => live && setFailed(true))
    return () => {
      live = false
    }
  }, [session, progress, count])

  const current = set[at]
  const choice = answers[at] ?? null
  const finished = set.length > 0 && at >= set.length
  const right = answers.filter((a, i) => a !== null && a === set[i]?.right).length

  const answer = (o: string) => {
    if (!current || choice) return
    setAnswers((list) => list.map((a, i) => (i === at ? o : a)))
  }
  const next = () => setAt((n) => n + 1)

  // keyboard, for class: A to F answer the question on screen, Enter or N moves on
  useEffect(() => {
    if (!set.length) return
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.repeat) return
      if ((e.target as HTMLElement).closest('textarea, input, select') || document.querySelector('.draw-board, .draw-text')) return
      const rect = box.current?.getBoundingClientRect()
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight * 0.75) return // another slide is on screen
      const key = e.key.toLowerCase()
      const index = 'abcdef'.indexOf(key)
      if (current && !choice && key.length === 1 && index >= 0 && index < current.options.length) {
        e.preventDefault()
        setAnswers((list) => list.map((a, i) => (i === at ? current.options[index] : a)))
      } else if (current && choice && (key === 'enter' || key === 'n')) {
        e.preventDefault()
        setAt((n) => n + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [set, at, current, choice])

  if (failed) return <p>This quiz could not be loaded. Check your internet connection and reload the page.</p>
  if (!all || !set.length) return <p>Loading the questions…</p>

  const dots = (
    <ol className="quiz-dots" aria-label={`${set.length} questions`}>
      {set.map((q, i) => {
        const a = answers[i]
        const state = a === null ? (i === at ? 'now' : 'todo') : a === q.right ? 'right' : 'wrong'
        return <li key={i} className={state} aria-label={`Question ${i + 1}: ${state === 'now' ? 'on screen' : state === 'todo' ? 'not answered yet' : state}`} />
      })}
    </ol>
  )

  if (finished) {
    return (
      <div className="quiz" ref={box}>
        <div className="quiz-progress">
          <span>All {set.length} questions answered</span>
          {dots}
        </div>
        <div className="quiz-score" aria-live="polite">
          <p className="quiz-score-big">{right} of {set.length} right</p>
          <p>{right === set.length ? 'All correct. Well done.' : right === 0 ? 'Read the slides before this one again, then try new questions.' : 'Look back at the ones you missed, then try new questions.'}</p>
        </div>
        <div className="quiz-actions">
          <span />
          <button type="button" className="quiz-next" onClick={() => start(all)}>Try {set.length} new questions</button>
        </div>
      </div>
    )
  }

  const state = (o: string) => {
    if (!choice) return ''
    if (o === current.right) return ' right'
    return o === choice ? ' wrong' : ' dim'
  }
  const split = current.question.indexOf('\n\n')

  return (
    <div className="quiz" ref={box}>
      <div className="quiz-progress">
        <span>Question {at + 1} of {set.length}</span>
        {dots}
      </div>
      <p className="quiz-q">{split < 0 ? current.question : current.question.slice(0, split)}</p>
      {split >= 0 && <pre className="quiz-code"><Code code={current.question.slice(split + 2)} /></pre>}
      <div className="quiz-options">
        {current.options.map((o, i) => (
          <button type="button" key={o} className={'quiz-option' + state(o)} onClick={() => answer(o)} disabled={!!choice}>
            <b>{'ABCDEF'[i]}</b>
            <span className={looksLikeCode(o) ? 'quiz-mono' : undefined}>{o}</span>
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
            {choice ? `${right} right so far` : 'Pick an answer'}
            <small className="quiz-keys">{choice ? ' · press Enter to go on' : ` · or press A to ${'ABCDEF'[current.options.length - 1]}`}</small>
          </span>
          {choice && <button type="button" className="quiz-next" onClick={next}>{at === set.length - 1 ? 'See your score →' : 'Next question →'}</button>}
        </div>
      </div>
    </div>
  )
}
