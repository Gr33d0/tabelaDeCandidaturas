import "./TableStyle.css";
import { useEffect, useState } from "react";

export default function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:3000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
      query {
        vacancies {
          id
          position
          location
          timeOfApplication
          timeOfResponse
          typeOfEmployment
          link
          status
          business {
            id
            name
          }
        }
      }
    `,
          }),
        });

        const data = await res.json();

        if (data.errors) {
          setError(data.errors[0].message);
        } else {
          setData(data.data.vacancies);
        }
      } catch (err) {
        setError("Erro ao buscar dados");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Function</th>
            <th>Location</th>
            <th>Time of Application</th>
            <th>Time of Response</th>
            <th>Type of Employment</th>
            <th>Status</th>
            <th>Business Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vacancie: any) => (
            <tr key={vacancie.id}>
              <td>{vacancie.position}</td>
              <td>{vacancie.location}</td>
              <td>{vacancie.timeOfApplication}</td>
              <td>{vacancie.timeOfResponse}</td>
              <td>{vacancie.typeOfEmployment}</td>
              <td>{vacancie.status}</td>
              <td>{vacancie.business?.name || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
