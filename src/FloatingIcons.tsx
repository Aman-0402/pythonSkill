import { useLayoutEffect, useRef } from 'react'
import { placeTile } from './placement'

// Python data-science and analysis logos from the open-source Devicon set (MIT), stored in public/icons/.
const tools = [
  { name: 'Pandas', file: 'pandas' },
  { name: 'Python', file: 'python' },
  { name: 'NumPy', file: 'numpy' },
  { name: 'TensorFlow', file: 'tensorflow' },
  { name: 'Matplotlib', file: 'matplotlib' },
  { name: 'scikit-learn', file: 'scikitlearn' },
  { name: 'Jupyter', file: 'jupyter' },
  { name: 'PyTorch', file: 'pytorch' },
  { name: 'Plotly', file: 'plotly' },
  { name: 'OpenCV', file: 'opencv' },
]

export default function FloatingIcons() {
  const box = useRef<HTMLDivElement>(null)

  // every visit: random places, tilt and float speed (before first paint, so tiles never jump)
  useLayoutEffect(() => {
    const tiles = Array.from(box.current!.querySelectorAll<HTMLElement>('.floater'))
    for (const tile of tiles) {
      placeTile(tile, tiles)
      tile.style.setProperty('--r', `${(Math.random() * 18 - 9).toFixed(1)}deg`)
      tile.style.setProperty('--dur', `${(6 + Math.random() * 4).toFixed(1)}s`)
      tile.style.setProperty('--delay', `${(-Math.random() * 8).toFixed(1)}s`)
    }
  }, [])

  return (
    <div className="floaters" ref={box} aria-hidden="true">
      {tools.map((t) => (
        <div className="floater" key={t.file}>
          <img src={`${import.meta.env.BASE_URL}icons/${t.file}.svg`} alt="" draggable={false} />
        </div>
      ))}
    </div>
  )
}
