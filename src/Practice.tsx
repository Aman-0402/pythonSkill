import { Link } from './router'
import list from './practice-list.json'

const url = (path: string) => `${import.meta.env.BASE_URL}practice-files/${path}`
const groups = [...new Set(list.files.map((f) => f.group))]

export default function Practice() {
  return (
    <div className="light-page">
    <main className="contents wrap">
      <Link href="/contents" className="back">
        ← Contents
      </Link>
      <header className="contents-head">
        <h1>Practice files</h1>
        <p>Download these to run the lessons on your own computer. Keep each file in the same folder as your script.</p>
        <a className="practice-all" href={url(list.zip)} download>Download everything (zip)</a>
      </header>

      {groups.map((group) => (
        <section className="practice-group" key={group}>
          <h2>{group}</h2>
          <ul>
            {list.files.filter((f) => f.group === group).map((f) => (
              <li key={f.path}>
                <a href={url(f.path)} download>{f.path.split('/').pop()}</a>
                <span className="practice-session">Session {f.sessions}</span>
                <span className="practice-what">{f.what}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
    </div>
  )
}
