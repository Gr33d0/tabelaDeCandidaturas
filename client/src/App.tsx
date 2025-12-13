
import './App.css'
import Filter from './components/filterComponent/Filter.tsx'
import Table from './components/tableComponent/Table.tsx'
function App() {


  return (
    <div className='container'>
      <div>
        <Filter />
      </div>
      <div>
  <Table/>
      </div>
    </div>
  )
}

export default App
