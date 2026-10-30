// Official-style language logos from the open-source Devicon set (MIT), stored in public/icons/.
const languages = [
  { name: 'JavaScript', file: 'javascript' },
  { name: 'Python', file: 'python' },
  { name: 'Java', file: 'java' },
  { name: 'Rust', file: 'rust' },
  { name: 'TypeScript', file: 'typescript' },
  { name: 'C#', file: 'csharp' },
  { name: 'C++', file: 'cplusplus' },
  { name: 'Go', file: 'go' },
  { name: 'PHP', file: 'php' },
  { name: 'Swift', file: 'swift' },
]

export default function FloatingIcons() {
  return (
    <div className="floaters" aria-hidden="true">
      {languages.map((l) => (
        <div className="floater" key={l.file}>
          <img src={`${import.meta.env.BASE_URL}icons/${l.file}.svg`} alt="" draggable={false} />
        </div>
      ))}
    </div>
  )
}
