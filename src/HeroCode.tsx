import { useEffect, useState } from 'react'
import { Highlight } from './Highlight'

// Animated code window and floating tool logos for the notes title screen.
const lines = ['# your first program', 'print("Hello, World!")']

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
const icon = (name: string) => `${import.meta.env.BASE_URL}icons/${name}.svg`

export default function HeroCode() {
  const [typed, setTyped] = useState<string[]>(reduced ? lines : [''])
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    if (reduced) return
    let alive = true
    const run = async () => {
      while (alive) {
        setTyped([''])
        setDone(false)
        for (let l = 0; l < lines.length; l++) {
          for (let c = 1; c <= lines[l].length; c++) {
            if (!alive) return
            setTyped((t) => [...t.slice(0, l), lines[l].slice(0, c)])
            await wait(l === 0 ? 35 : 70)
          }
          await wait(350)
          if (l < lines.length - 1) setTyped((t) => [...t, ''])
        }
        await wait(300)
        if (!alive) return
        setDone(true)
        await wait(4200)
      }
    }
    run()
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="hero-stage" aria-hidden="true">
      <div className="hero-win">
        <div className="hero-win-bar">
          <i />
          <i />
          <i />
          <span>hello.py</span>
        </div>
        <div className="hero-win-body">
          {typed.map((text, i) => (
            <div key={i}>
              <em>{i + 1}</em>
              <Highlight line={text} />
              {!done && i === typed.length - 1 && <b className="hero-caret" />}
            </div>
          ))}
        </div>
        <div className={done ? 'hero-win-out on' : 'hero-win-out'}>
          <small>OUTPUT</small>
          <div>Hello, World!</div>
        </div>
      </div>

      <span className="hero-tile t1"><img src={icon('python')} alt="" draggable={false} /></span>
      <span className="hero-tile t2"><img src={icon('pandas')} alt="" draggable={false} /></span>
      <span className="hero-tile t3"><img src={icon('numpy')} alt="" draggable={false} /></span>
      <span className="hero-tile t4"><img src={icon('jupyter')} alt="" draggable={false} /></span>
    </div>
  )
}
