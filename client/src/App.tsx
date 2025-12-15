
import './App.css'
import Filter from './components/filterComponent/Filter.tsx'
import Table from './components/tableComponent/Table.tsx'
import AddButton from './components/addButtonComponent/AddButton.tsx'
function App() {


  return (
    <div className='container'>
      <div>
        <Filter />
      </div>
      <div>
        <AddButton />
        <Table/>
      </div>
    </div>
  )
}

export default App
