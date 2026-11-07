import { memo, useMemo } from 'react'

// Python colouring in the style of VS Code's Dark+ theme. The colours themselves are CSS variables (--tk-*) in index.css.
type Kind = 'kw' | 'st' | 'fn' | 'ty' | 'str' | 'esc' | 'num' | 'com' | 'var' | 'con' | 'op' | 'b0' | 'b1' | 'b2' | ''
type Token = { text: string; kind: Kind }

const CONTROL = new Set('if elif else for while return import from as with try except finally raise break continue pass yield await assert'.split(' '))
const STORAGE = new Set('def class lambda and or not in is None True False self cls del global nonlocal async'.split(' '))
const TYPES = new Set('int float str bool list dict set tuple frozenset bytes bytearray complex range object type'.split(' '))
const STRING_START = /^([rRbBfFuU]{0,2})("""|'''|"|')/

// The names brought in by import lines (np, pd, plt ...) are coloured like classes, as VS Code does.
function importedNames(src: string) {
  const names = new Set<string>()
  for (const m of src.matchAll(/^\s*import\s+(.+)$/gm)) {
    for (const part of m[1].split(',')) names.add(part.trim().split(/\s+as\s+/).pop()!.split('.')[0].trim())
  }
  for (const m of src.matchAll(/^\s*from\s+\S+\s+import\s+(.+)$/gm)) {
    for (const part of m[1].split(',')) names.add(part.trim().split(/\s+as\s+/).pop()!.trim())
  }
  return names
}

function tokenize(src: string): Token[] {
  const out: Token[] = []
  const imported = importedNames(src)
  const brackets = { depth: 0 }
  scan(src, out, imported, brackets)
  return out
}

function scan(src: string, out: Token[], imported: Set<string>, brackets: { depth: number }) {
  const push = (text: string, kind: Kind) => {
    const last = out[out.length - 1]
    if (last && last.kind === kind) last.text += text
    else out.push({ text, kind })
  }
  let i = 0
  let prevWord = ''
  let prevChar = ''
  while (i < src.length) {
    const c = src[i]
    const rest = src.slice(i)

    if (c === '#') {
      const end = src.indexOf('\n', i)
      const stop = end < 0 ? src.length : end
      push(src.slice(i, stop), 'com')
      i = stop
      continue
    }

    const str = /[rRbBfFuU"']/.test(c) ? rest.match(STRING_START) : null
    if (str && !/[\w]/.test(prevChar)) {
      i += readString(src, i, str[1], str[2], push, imported)
      prevChar = '"'
      prevWord = ''
      continue
    }

    if (/\d/.test(c) || (c === '.' && /\d/.test(src[i + 1] ?? '') && !/[\w)\]]/.test(prevChar))) {
      const num = rest.match(/^(0[xX][\da-fA-F_]+|0[bB][01_]+|\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?|\.\d+)[jJ]?/)![0]
      push(num, 'num')
      i += num.length
      prevChar = '0'
      prevWord = ''
      continue
    }

    if (/[A-Za-z_]/.test(c)) {
      const word = rest.match(/^\w+/)![0]
      const after = src.slice(i + word.length).match(/^\s*(.?)/)?.[1] ?? ''
      let kind: Kind = 'var'
      if (prevChar !== '.' && CONTROL.has(word)) kind = 'kw'
      else if (prevChar !== '.' && STORAGE.has(word)) kind = 'st'
      else if (prevWord === 'def') kind = 'fn'
      else if (prevWord === 'class') kind = 'ty'
      else if (prevChar !== '.' && (TYPES.has(word) || imported.has(word))) kind = 'ty'
      else if (/^[A-Z][A-Z0-9_]+$/.test(word)) kind = 'con'
      else if (/^[A-Z]/.test(word)) kind = 'ty'
      else if (after === '(') kind = 'fn'
      push(word, kind)
      i += word.length
      prevWord = word
      prevChar = 'a'
      continue
    }

    if (c === '@' && (i === 0 || src[i - 1] === '\n' || /^\s*$/.test(src.slice(src.lastIndexOf('\n', i - 1) + 1, i)))) {
      const name = rest.match(/^@[\w.]*/)![0]
      push(name, 'fn')
      i += name.length
      continue
    }

    if ('([{'.includes(c)) {
      push(c, `b${brackets.depth % 3}` as Kind)
      brackets.depth++
    } else if (')]}'.includes(c)) {
      brackets.depth = Math.max(0, brackets.depth - 1)
      push(c, `b${brackets.depth % 3}` as Kind)
    } else {
      push(c, /\s/.test(c) ? '' : 'op')
    }
    if (!/\s/.test(c)) {
      prevChar = c
      prevWord = ''
    }
    i++
  }
}

// Writes one string (and the {expressions} of an f-string) and gives back how many characters it used.
function readString(
  src: string,
  start: number,
  prefix: string,
  quote: string,
  push: (text: string, kind: Kind) => void,
  imported: Set<string>,
) {
  const raw = /[rR]/.test(prefix)
  const isF = /[fF]/.test(prefix)
  const triple = quote.length === 3
  if (prefix) push(prefix, 'st')
  push(quote, 'str')
  let i = start + prefix.length + quote.length
  while (i < src.length) {
    if (src.startsWith(quote, i)) {
      push(quote, 'str')
      return i + quote.length - start
    }
    const c = src[i]
    if (c === '\n' && !triple) return i - start // an unfinished string stops at the end of its line
    if (c === '\\' && i + 1 < src.length) {
      push(src.slice(i, i + 2), raw ? 'str' : 'esc')
      i += 2
    } else if (isF && (src.startsWith('{{', i) || src.startsWith('}}', i))) {
      push(src.slice(i, i + 2), 'esc')
      i += 2
    } else if (isF && c === '{') {
      let depth = 1
      let j = i + 1
      let colon = -1
      while (j < src.length && depth > 0 && src[j] !== '\n') {
        if ('([{'.includes(src[j])) depth++
        else if (')]}'.includes(src[j])) depth--
        else if (src[j] === ':' && depth === 1 && colon < 0) colon = j
        j++
      }
      const closed = depth === 0
      const end = closed ? j - 1 : j
      const stop = colon >= 0 ? colon : end
      push('{', 'st')
      const inner: Token[] = []
      scan(src.slice(i + 1, stop), inner, imported, { depth: 0 })
      for (const t of inner) push(t.text, t.kind)
      if (colon >= 0) push(src.slice(colon, end), 'num')
      if (closed) push('}', 'st')
      i = j
    } else {
      push(c, 'str')
      i++
    }
  }
  return i - start
}

// Terminal commands, Markdown, CSV and folder trees are not Python, so they stay plain.
export function isPython(code: string, label?: string) {
  if (/terminal|powershell|command prompt|markdown|readme|\.csv|package|folder/i.test(label ?? '')) return /^\s*(from|import)\s/.test(code)
  return !/^\s*(P\s+y\s+t|pip |python |winget |brew |sudo |jupyter |mkdir |code --)/.test(code)
}

const Coloured = memo(function Coloured({ code }: { code: string }) {
  const tokens = useMemo(() => tokenize(code), [code])
  return (
    <>
      {tokens.map((t, i) => (t.kind ? <span className={'tk-' + t.kind} key={i}>{t.text}</span> : t.text))}
    </>
  )
})

// A whole piece of code. Put it inside a <pre>.
export function Code({ code, label }: { code: string; label?: string }) {
  return isPython(code, label) ? <Coloured code={code} /> : <>{code}</>
}

// One line on its own (the typing code window and the drawings use this).
export function Highlight({ line }: { line: string }) {
  return <Coloured code={line} />
}
