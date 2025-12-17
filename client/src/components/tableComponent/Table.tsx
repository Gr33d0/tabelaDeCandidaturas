import { useEffect, useState } from "react";
import "./TableStyle.css";

type Vacancy = {
  id: string;
  position: string;
  location: string; 
  timeOfApplication: string;
  timeOfResponse: string;
  typeOfEmployment: string;
  link: string;
  status: string;
  business: { id: string; name: string } | null;
};

const STATUS_OPTIONS = ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"];
const EMPLOYMENT_OPTIONS = ["REMOTE", "HYBRID", "PRESENTIAL"];

export default function Table() {
  const [data, setData] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<keyof Vacancy | null>(null);

  // Fetch vacancies
  const getData = async () => {
    try {
      const res = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      const json = await res.json();
      if (json.errors) setError(json.errors[0].message);
      else setData(json.data.vacancies);
    } catch {
      setError("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Atualiza o estado local
  const updateField = (id: string, field: keyof Vacancy, value: string) => {
    setData((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  // Salva vacancy no backend
  const saveVacancy = async (vacancy: Vacancy) => {
    const input = {
      position: vacancy.position,
      location: vacancy.location,
      timeOfApplication: vacancy.timeOfApplication,
      timeOfResponse: vacancy.timeOfResponse,
      typeOfEmployment: vacancy.typeOfEmployment,
      link: vacancy.link,
      status: vacancy.status,
    };

    try {
      await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation {
              updateVacancy(id: "${vacancy.id}", input: {
                position: "${input.position}",
                location: "${input.location}",
                timeOfApplication: "${input.timeOfApplication}",
                timeOfResponse: "${input.timeOfResponse}",
                typeOfEmployment: "${input.typeOfEmployment}",
                link: "${input.link}",
                status: "${input.status}"
              }) {
                id
              }
            }
          `,
        }),
      });
    } catch (err) {
      console.error("Erro ao salvar vacancy:", err);
    }
  };

  // Renderiza valor seguro para TS (string ou objeto)
  const renderValue = (value: string | { id: string; name: string } | null) => {
    if (typeof value === "string") return value;
    if (value && "name" in value) return value.name;
    return "-";
  };

  // Render cell click-to-edit
  const renderCell = (
    vacancy: Vacancy,
    field: keyof Vacancy,
    type: "text" | "url" | "select",
    options?: string[]
  ) => {
    if (editingId === vacancy.id && editingField === field) {
      if (type === "select" && options) {
        return (
          <select
            value={vacancy[field] as string}
            onChange={(e) => updateField(vacancy.id, field, e.target.value)}
            onBlur={() => {
              setEditingId(null);
              setEditingField(null);
              const updatedVacancy = data.find((d) => d.id === vacancy.id);
              if (updatedVacancy) saveVacancy(updatedVacancy);
            }}
            autoFocus
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      } else {
        return (
          <input
            type={type}
            value={vacancy[field] as string}
            onChange={(e) => updateField(vacancy.id, field, e.target.value)}
            onBlur={() => {
              setEditingId(null);
              setEditingField(null);
              const updatedVacancy = data.find((d) => d.id === vacancy.id);
              if (updatedVacancy) saveVacancy(updatedVacancy);
            }}
            autoFocus
          />
        );
      }
    } else {
      return (
        <span
          onClick={() => {
            setEditingId(vacancy.id);
            setEditingField(field);
          }}
          style={{ cursor: "pointer" }}
        >
          {renderValue(vacancy[field])}
        </span>
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Location</th>
            <th>Applied At</th>
            <th>Response At</th>
            <th>Employment Type</th>
            <th>Status</th>
            <th>Link</th>
            <th>Business</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => (
            <tr key={v.id}>
              <td>{renderCell(v, "position", "text")}</td>
              <td>{renderCell(v, "location", "text")}</td>
              <td>{v.timeOfApplication}</td>
              <td>{renderCell(v, "timeOfResponse", "text")}</td>
              <td>
                {renderCell(v, "typeOfEmployment", "select", EMPLOYMENT_OPTIONS)}
              </td>
              <td>{renderCell(v, "status", "select", STATUS_OPTIONS)}</td>
              <td>{renderCell(v, "link", "url")}</td>
              <td>{v.business?.name ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
