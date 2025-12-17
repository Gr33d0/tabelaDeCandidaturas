
import './App.css'
import Filter from './components/filterComponent/Filter.tsx'
import Table from './components/tableComponent/Table.tsx'
import AddVacancyButton from './components/addVacancyButtonComponent/AddVacancyButton.tsx'
import AddBusinessButton from './components/addBusinessButtonComponent/AddBusinessButton.tsx'
function App() {


  return (
    <div className='container'>
      <div>
        <Filter />
      </div>
      <div>
        <AddVacancyButton />
        <AddBusinessButton />
        <Table/>
      </div>
    </div>
  )
}

export default App
