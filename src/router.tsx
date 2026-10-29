import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react'

// '' locally, '/pythonSkill' on GitHub Pages
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

const current = () => window.location.pathname.slice(BASE.length) || '/'

export function usePath() {
  const [path, setPath] = useState(current())
  useEffect(() => {
    const onPop = () => setPath(current())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

export function navigate(to: string) {
  window.history.pushState(null, '', BASE + to)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

export function Link({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    navigate(href)
  }
  return <a href={BASE + href} onClick={handle} {...rest} />
}
