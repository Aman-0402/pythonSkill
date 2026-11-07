import { Suspense, lazy, useEffect, type ComponentType } from 'react'
import Draw from './Draw'
import { usePath } from './router'

// Each page loads only when it is opened: three.js stays out of the lessons, and the lessons stay out of the landing page.
// After a new deploy an open tab may ask for a file that has gone; reload once to pick up the new version.
function page<T extends object>(load: () => Promise<{ default: ComponentType<T> }>) {
  return lazy(() =>
    load().catch((error) => {
      if (sessionStorage.getItem('reloaded-for-update')) throw error
      sessionStorage.setItem('reloaded-for-update', '1')
      window.location.reload()
      return new Promise<never>(() => {})
    }),
  )
}

const loadContents = () => import('./Contents')
const Landing = page(() => import('./Landing'))
const Contents = page(loadContents)
const Lesson = page(() => import('./Lesson'))
const Practice = page(() => import('./Practice'))

function App() {
  const path = usePath().replace(/\/+$/, '')

  // the next page most people open: fetch it quietly so the click feels instant
  useEffect(() => {
    const timer = setTimeout(() => void loadContents().catch(() => undefined), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Suspense fallback={<div className="page-loading">Loading…</div>}>
        {path === '/contents' ? <Contents /> : path === '/practice' ? <Practice /> : path.startsWith('/contents/') ? <Lesson slug={path.slice('/contents/'.length)} /> : <Landing />}
      </Suspense>
      <Draw />
    </>
  )
}

export default App
