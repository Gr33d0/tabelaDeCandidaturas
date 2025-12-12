export default function Filter() {
  return (
    <div className="container">
      Filtro
      <form action="">
        <div>
          <label htmlFor="role">Function:</label>
          <input type="text" id="role" name="role" placeholder="Function" />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
          />
        </div>
        <div>
          <label htmlFor="timeOfApplication">Time of Application:</label>
          <input
            type="text"
            id="timeOfApplication"
            name="timeOfApplication"
            placeholder="Time of Application"
          />
        </div>
        <div>
          <label htmlFor="timeOfResponse">Time of Response:</label>
          <input
            type="text"
            id="timeOfResponse"
            name="timeOfResponse"
            placeholder="Time of Response"
          />
        </div>
        <div>
          <label htmlFor="typeOfEmployment">Type of Employment:</label>
          <input
            type="text"
            id="typeOfEmployment"
            name="typeOfEmployment"
            placeholder="Type of Employment"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select name="status" id="status">
            <option value="all">Todos</option>
            <option value="pending">Pendente</option>
            <option value="approved">Aprovado</option>
            <option value="rejected">Rejeitado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dateFrom">Data de:</label>
          <input type="date" id="dateFrom" name="dateFrom" />
        </div>
        <div>
          <label htmlFor="businessName">Business Name:</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            placeholder="Business Name"
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" placeholder="City" />
        </div>
      </form>
    </div>
  );
}
