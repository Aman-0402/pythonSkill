// What this browser has read: for each lesson, the last slide, how far through it was, and whether it was ever finished.
// Kept only in this browser, so everything here must work when storage is blocked.
export type LessonProgress = { slide: string; pct: number; done: boolean }
export type Progress = Record<string, LessonProgress>

const KEY = 'reading-progress'

export function readProgress(): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}')
    return saved && typeof saved === 'object' ? saved : {}
  } catch {
    return {}
  }
}

export function saveSlide(slug: string, slide: string, pct: number, finished: boolean) {
  try {
    const all = readProgress()
    all[slug] = { slide, pct, done: finished || !!all[slug]?.done }
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    /* storage blocked: nothing is remembered */
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* storage blocked */
  }
}
