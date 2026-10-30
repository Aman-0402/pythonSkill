// Tiny Python syntax colouring for one line: comments, strings, print/exit and numbers.
export function Highlight({ line }: { line: string }) {
  const parts = line.split(/(#.*$|"[^"]*"|'[^']*'|\b(?:print|exit|Print|prnt)(?=\()|\b\d+(?:\.\d+)?\b)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('#')) return <span className="tok-com" key={i}>{part}</span>
        if (/^["']/.test(part)) return <span className="tok-str" key={i}>{part}</span>
        if (/^(print|exit|Print|prnt)$/.test(part)) return <span className="tok-fn" key={i}>{part}</span>
        if (/^\d/.test(part)) return <span className="tok-num" key={i}>{part}</span>
        return part
      })}
    </>
  )
}
