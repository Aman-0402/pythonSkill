import Scene from './Scene'
import FloatingIcons from './FloatingIcons'
import { Link } from './router'

export default function Landing() {
  return (
    <>
      <Scene />
      <FloatingIcons />
      <main className="landing">
        <h1 className="hero-title">Python</h1>
        <Link href="/contents" className="cta">
          <span className="cta-prompt">&gt;&gt;&gt;</span>
          Start your journey
        </Link>
      </main>
    </>
  )
}
