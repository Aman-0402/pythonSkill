import Landing from './Landing'
import Contents from './Contents'
import Lesson from './Lesson'
import { usePath } from './router'

function App() {
  const path = usePath().replace(/\/+$/, '')
  if (path === '/contents') return <Contents />
  if (path.startsWith('/contents/')) return <Lesson slug={path.slice('/contents/'.length)} />
  return <Landing />
}

export default App
