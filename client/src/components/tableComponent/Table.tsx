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
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                businesses {
                  id
                  position
                  location
                  status
                }
              }
            `
          })
        });

        const data = await res.json();

        if (data.errors) {
          setError(data.errors[0].message);
        } else {
          setData(data.data.businesses);
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
          {data.map((business: any) => (
            <tr key={business.id}>
              <td>{business.position}</td>
              <td>{business.location}</td>
              <td>2024-01-15</td>
              <td>2024-01-20</td>
              <td>Full-time</td>
              <td>{business.status}</td>
            <td>TechCorp</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}
