import "./App.css";
import Filter from "./components/filterComponent/Filter";
import Table from "./components/tableComponent/Table";
import AddVacancyButton from "./components/addVacancyButtonComponent/AddVacancyButton";
import AddBusinessButton from "./components/addBusinessButtonComponent/AddBusinessButton";
import { useState } from "react";

function App() {
  // Estado de filtros
  const [filters, setFilters] = useState({
    role: "",
    location: "",
    timeOfApplication: "",
    timeOfResponse: "",
    typeOfEmployment: "",
    status: "all",
    businessName: "",
    city: "",
  });

  // Atualiza um filtro específico
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container">

      <div className="left-side">
        <Filter filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className="right-side ">
        <div className="table-header">
          <AddVacancyButton />
          <AddBusinessButton />
        </div>

        <Table filters={filters} />
      </div>
    </div>
  );
}

export default App;
