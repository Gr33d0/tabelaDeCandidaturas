import "./FilterStyle.css";

type FilterProps = {
    filters: {
    role: string;
    location: string;
    timeOfApplication: string;
    timeOfResponse: string;
    typeOfEmployment: string;
    status: string;
    businessName: string;
    city: string;
  };
  onFilterChange: (field: string, value: string) => void;
};

export default function Filter({ filters, onFilterChange }: FilterProps) {
  return (
    <div className="filter">
      <form action="">
        Filtro
        <div className="form-group">
          <p>Function</p>
          <input
            type="text"
            id="role"
            name="role"
            value={filters.role}
            onChange={(e) => onFilterChange("role", e.target.value)}
            placeholder="Function"
          />
        </div>
        <div className="form-group">
          <p>Location:</p>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={(e) => onFilterChange("location", e.target.value)}
            placeholder="Location"
          />
        </div>
        <div className="form-group">
          <p>Time of Application:</p>
          <input
            type="text"
            id="timeOfApplication"
            name="timeOfApplication"
            placeholder="Time of Application"
            value={filters.timeOfApplication}
            onChange={(e) => onFilterChange("timeOfApplication", e.target.value)}
          />
        </div>
        <div className="form-group">
          <p>Time of Response:</p>
          <input
            type="text"
            id="timeOfResponse"
            name="timeOfResponse"
            placeholder="Time of Response"
            value={filters.timeOfResponse}
            onChange={(e) => onFilterChange("timeOfResponse", e.target.value)}
          />
        </div>
        <div className="form-group">
          <p>Type of Employment:</p>
          <select name="typeOfEmployment" id="typeOfEmployment" value={filters.typeOfEmployment} onChange={(e) => onFilterChange("typeOfEmployment", e.target.value)}> 
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="presential">Presential</option>

          </select>

        </div>
        <div className="form-group">
          <p>Status:</p>
          <select name="status" id="status" value={filters.status} onChange={(e) => onFilterChange("status", e.target.value)}>
            <option value="all">Todos</option>
            <option value="pending">Pendente</option>
            <option value="approved">Aprovado</option>
            <option value="rejected">Rejeitado</option>
          </select>
        </div>
        <div className="form-group">
          <p>Business Name:</p>
          <input
            type="text"
            id="businessName"
            name="businessName"
            placeholder="Business Name"
            value={filters.businessName}
            onChange={(e) => onFilterChange("businessName", e.target.value)}
          />
        </div>
        <div className="form-group">
          <p>City:</p>
          <input type="text" id="city" name="city" placeholder="City" value={filters.city}
            onChange={(e) => onFilterChange("city", e.target.value)} />
        </div>
      </form>
    </div>
  );
}
