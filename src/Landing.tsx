import Scene from './Scene'
import FloatingIcons from './FloatingIcons'
import { Link } from './router'

const letters = [...'Python'].map((letter, i) => <span key={i}>{letter}</span>)

export default function Landing() {
  return (
    <>
      <Scene />
      <FloatingIcons />
      <main className="landing">
        {/* the snake's canvas sits between these two copies: it passes in front of P, t, o and behind y, h, n */}
        <div className="hero-word">
          <h1 className="hero-title">{letters}</h1>
          <div className="hero-title hero-title-over" aria-hidden="true">{letters}</div>
        </div>
        <Link href="/contents" className="cta">
          <span className="cta-prompt">&gt;&gt;&gt;</span>
          Start your journey
        </Link>
      </main>
    </>
  )
}
