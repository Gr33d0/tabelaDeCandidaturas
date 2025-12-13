import "./FilterStyle.css";
export default function Filter() {
  return (
    <div className="filter">
      <form action="">
        Filtro
        <div className="form-group">
          <p>Function</p>
          <input type="text" id="role" name="role" placeholder="Function" />
        </div>
        <div className="form-group">
          <p>Location:</p>
          <input
            type="text"
            id="location"
            name="location"
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
          />
        </div>
        <div className="form-group">
          <p>Time of Response:</p>
          <input
            type="text"
            id="timeOfResponse"
            name="timeOfResponse"
            placeholder="Time of Response"
          />
        </div>
        <div className="form-group">
          <p>Type of Employment:</p>
          <input
            type="text"
            id="typeOfEmployment"
            name="typeOfEmployment"
            placeholder="Type of Employment"
          />
        </div>
        <div className="form-group">
          <p>Status:</p>
          <select name="status" id="status">
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
          />
        </div>
        <div className="form-group">
          <p>City:</p>
          <input type="text" id="city" name="city" placeholder="City" />
        </div>
      </form>
    </div>
  );
}
