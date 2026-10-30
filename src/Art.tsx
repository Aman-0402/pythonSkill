import type { ReactNode } from 'react'
import { Highlight } from './Highlight'

// Picture shown under a slide title. Two slides have a drawn illustration (see `art` below);
// any slide can get its own picture by adding a file to src/slides/ named after the slide id
// (for example installation-windows.png). See src/slides/README.md for every slide id.
const pictures = import.meta.glob<string>('./slides/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const pictureFor = (id: string) =>
  Object.entries(pictures).find(([path]) => (path.split('/').pop() ?? '').replace(/\.[^.]+$/, '') === id)?.[1]

const icon = (name: string) => `${import.meta.env.BASE_URL}icons/${name}.svg`

function Chip({ file, label }: { file: string; label: string }) {
  return (
    <div className="chip">
      <span>
        <img src={icon(file)} alt="" draggable={false} />
      </span>
      {label}
    </div>
  )
}

const art: Record<string, () => ReactNode> = {
  // slide 1: What is Python?
  'hello-bubble': () => (
    <div className="hello">
      <span className="hello-logo">
        <img src={icon('python')} alt="" draggable={false} />
      </span>
      <div className="bubble">
        <Highlight line={'print("Hello, World!")'} />
      </div>
    </div>
  ),

  // slide 2: What Python is used for
  uses: () => (
    <div className="chips">
      <Chip file="pandas" label="Data analysis" />
      <Chip file="tensorflow" label="AI and machine learning" />
      <Chip file="django" label="Web development" />
      <Chip file="bash" label="Automation" />
    </div>
  ),
}

export default function Art({ name, id }: { name?: string; id: string }) {
  const picture = pictureFor(id)
  if (picture) {
    return (
      <div className="art">
        <img className="art-image" src={picture} alt="" draggable={false} />
      </div>
    )
  }
  const draw = name ? art[name] : undefined
  return draw ? (
    <div className="art" aria-hidden="true">
      {draw()}
    </div>
  ) : null
}
