// Picks a random spot for a floating logo tile: anywhere on screen except the middle band
// (title and button) and not on top of another tile. Positions are percentages of the screen.
export function placeTile(tile: HTMLElement, all: HTMLElement[]) {
  const others = all
    .filter((t) => t !== tile)
    .map((t) => ({ x: parseFloat(t.style.left), y: parseFloat(t.style.top) }))
    .filter((p) => !Number.isNaN(p.x) && !Number.isNaN(p.y))

  let spot: { x: number; y: number } | null = null
  for (let n = 0; n < 60; n++) {
    const x = 4 + Math.random() * 88
    const y = 6 + Math.random() * 84
    // on a phone the title fills the width, so keep the whole middle band clear
    const blocked = window.innerWidth < 700 ? y > 26 && y < 76 : x > 26 && x < 74 && y > 28 && y < 74
    if (blocked) continue
    const clear = others.every((p) => Math.abs(p.x - x) > 11 || Math.abs(p.y - y) > 14)
    if (clear) {
      spot = { x, y }
      break
    }
    spot ??= { x, y }
  }
  spot ??= { x: 5, y: 10 }

  tile.style.left = spot.x + '%'
  tile.style.top = spot.y + '%'
}
