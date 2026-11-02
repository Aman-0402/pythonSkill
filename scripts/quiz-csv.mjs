// Builds the quiz CSV files in "Quiz in CSV/", one per session, from the question lists in scripts/quiz-data/.
//
// usage (from the project root):
//   node --experimental-strip-types scripts/quiz-csv.mjs          all sessions
//   node --experimental-strip-types scripts/quiz-csv.mjs 3        one session
//
// CSV format (one row = one question):
//   Question, Option A ... Option F, Correct, Explanation
// Each question has 2 to 6 options. Correct is the letter of the right option. The students see the options in a
// random order, so the order here does not matter; this script shuffles them (always the same way for the same
// question) so the right answer is spread over the letters.
//
// A question in scripts/quiz-data/sN.mjs is:  [question, rightAnswer, [wrong answers], explanation, optionalPython]
// If optionalPython is given, the script runs it with Python and checks that its printed output equals rightAnswer,
// so every "what does this print?" answer is verified.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { lessons } from '../src/content.ts'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'Quiz in CSV')
const only = process.argv[2] ? Number(process.argv[2]) : null
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
const HEADER = ['Question', ...LETTERS.map((l) => `Option ${l}`), 'Correct', 'Explanation']

// small seeded random generator, so regenerating gives the same file
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const csvCell = (s) => (/[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s)

let failed = false
const fail = (msg) => {
  console.error('  ERROR:', msg)
  failed = true
}

for (let n = 1; n <= lessons.length; n++) {
  if (only && n !== only) continue
  const file = path.join(import.meta.dirname, 'quiz-data', `s${n}.mjs`)
  if (!fs.existsSync(file)) {
    console.log(`Session ${n}: no question file (scripts/quiz-data/s${n}.mjs), skipped`)
    continue
  }
  const { default: items } = await import(new URL(`file:///${file.replace(/\\/g, '/')}`).href)
  const random = rng(n * 7919)
  const rows = []
  const seen = new Set()
  const tally = Object.fromEntries(LETTERS.map((l) => [l, 0]))
  console.log(`Session ${n}: ${lessons[n - 1].title}`)

  items.forEach(([question, right, wrong, why, run], i) => {
    const tag = `question ${i + 1}`
    const options = [right, ...wrong]
    if (options.length < 2 || options.length > 6) fail(`${tag}: needs 2 to 6 options, has ${options.length}`)
    if (new Set(options).size !== options.length) fail(`${tag}: duplicate options`)
    if (options.some((o) => !String(o).trim())) fail(`${tag}: empty option`)
    if (!question.trim() || !why.trim()) fail(`${tag}: empty question or explanation`)
    if (seen.has(question)) fail(`${tag}: duplicate question`)
    seen.add(question)
    for (const text of [question, why, ...options]) {
      if (/[^\x20-\x7e]/.test(text)) fail(`${tag}: non-ASCII or control character in "${text.slice(0, 40)}"`)
    }
    if (run) {
      let out
      try {
        out = execFileSync('python', ['-c', run], { encoding: 'utf8', timeout: 10000 }).replace(/\r?\n$/, '')
      } catch (e) {
        fail(`${tag}: the check code failed: ${String(e.stderr || e.message).trim().split('\n').pop()}`)
        return
      }
      if (out !== right) fail(`${tag}: Python printed ${JSON.stringify(out)} but the answer is ${JSON.stringify(right)}`)
    }

    // put the right answer on the least-used letter so far (ties broken at random), shuffle the others around it
    const room = LETTERS.slice(0, options.length)
    const least = Math.min(...room.map((l) => tally[l]))
    const spots = room.filter((l) => tally[l] === least)
    const correct = spots[Math.floor(random() * spots.length)]
    tally[correct]++
    const others = wrong.map((o) => ({ o, r: random() })).sort((a, b) => a.r - b.r).map((x) => x.o)
    const order = room.map((l) => ({ o: l === correct ? right : others.shift() }))
    const cells = [question, ...LETTERS.map((_, k) => (order[k] ? order[k].o : '')), correct, why]
    rows.push(cells.map(csvCell).join(','))
  })

  fs.mkdirSync(outDir, { recursive: true })
  const name = `Session ${n} - ${lessons[n - 1].title}.csv`
  fs.writeFileSync(path.join(outDir, name), [HEADER.join(','), ...rows].join('\r\n') + '\r\n')
  console.log(`  wrote "Quiz in CSV/${name}": ${rows.length} questions; right answers by letter ${JSON.stringify(tally)}`)
}

if (failed) {
  console.error('Fix the errors above and run again.')
  process.exit(1)
}
