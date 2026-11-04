import Landing from './Landing'
import Contents from './Contents'
import Lesson from './Lesson'
import Draw from './Draw'
import { usePath } from './router'

function App() {
  const path = usePath().replace(/\/+$/, '')
  const page = path === '/contents' ? <Contents /> : path.startsWith('/contents/') ? <Lesson slug={path.slice('/contents/'.length)} /> : <Landing />
  return (
    <>
      {page}
      <Draw />
    </>
  )
}

export default App
