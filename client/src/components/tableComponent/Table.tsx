import { useEffect, useState } from "react";
import "./TableStyle.css";
import DeleteVacancyButton from "./DeleteVacancyButton";

type Vacancy = {
  id: string;
  position: string;
  location: string;
  timeOfApplication: string;
  timeOfResponse: number;
  typeOfEmployment: string;
  link: string;
  status: string;
  business: { id: string; name: string } | null;
};

const STATUS_OPTIONS = ["applied", "interview", "approved", "rejected"];
const EMPLOYMENT_OPTIONS = ["remote", "hybrid", "presential"];

type TableProps = {
  filters: {
    role: string;
    location: string;
    timeOfApplication: string;
    timeOfResponse: number;
    typeOfEmployment: string;
    status: string;
    businessName: string;
    city: string;
  };
};

export default function Table({ filters }: TableProps) {
  const [data, setData] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<keyof Vacancy | null>(null);

  // State de ordenação
  const [sortField, setSortField] = useState<keyof Vacancy | "business">(
    "position"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const formatDate = (timestamp: string | number) => {
    const date = new Date(Number(timestamp));

    if (isNaN(date.getTime())) return "-";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
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

  const updateField = (
    id: string,
    field: keyof Vacancy,
    value: string | number
  ) => {
    setData((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

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
                timeOfResponse: ${input.timeOfResponse},
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

  const renderValue = (
    value: string | number | { id: string; name: string } | null
  ) => {
    if (typeof value === "string" || typeof value === "number") return value;
    if (value && "name" in value) return value.name;
    return "-";
  };

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
            onChange={(e) =>
              updateField(
                vacancy.id,
                field,
                field === "timeOfResponse"
                  ? Number(e.target.value)
                  : e.target.value
              )
            }
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

  // Filtra dados
  const filteredData = data.filter((v) => {
    return (
      (!filters.role ||
        v.position.toLowerCase().includes(filters.role.toLowerCase())) &&
      (!filters.location ||
        v.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.timeOfApplication ||
        v.timeOfApplication.includes(filters.timeOfApplication)) &&
      (!filters.timeOfResponse ||
        v.timeOfResponse === filters.timeOfResponse) &&
      (!filters.typeOfEmployment ||
        v.typeOfEmployment
          .toLowerCase()
          .includes(filters.typeOfEmployment.toLowerCase())) &&
      (filters.status === "all" ||
        v.status.toLowerCase() === filters.status.toLowerCase()) &&
      (!filters.businessName ||
        v.business?.name
          .toLowerCase()
          .includes(filters.businessName.toLowerCase())) &&
      (!filters.city ||
        v.location.toLowerCase().includes(filters.city.toLowerCase()))
    );
  });

  // Ordena dados
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue: string = "";
    let bValue: string = "";

    if (sortField === "business") {
      aValue = a.business?.name ?? "";
      bValue = b.business?.name ?? "";
    } else {
      aValue = (a[sortField] as string) ?? "";
      bValue = (b[sortField] as string) ?? "";
    }

    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleSort = (field: keyof Vacancy | "business") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {[
              { label: "Position", field: "position" },
              { label: "Location", field: "location" },
              { label: "Applied At", field: "timeOfApplication" },
              { label: "Response At", field: "timeOfResponse" },
              { label: "Employment Type", field: "typeOfEmployment" },
              { label: "Status", field: "status" },
              { label: "Link", field: "link" },
              { label: "Business", field: "business" },
            ].map((col) => (
              <th
                key={col.field}
                onClick={() =>
                  handleSort(col.field as keyof Vacancy | "business")
                }
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {col.label}{" "}
                {sortField === col.field && (
                  <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
            ))}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((v) => (
            <tr key={v.id}>
              <td>{renderCell(v, "position", "text")}</td>
              <td>{renderCell(v, "location", "text")}</td>
              <td>{formatDate(v.timeOfApplication)}</td>
              <td>{renderCell(v, "timeOfResponse", "text")} Months</td>
              <td>
                {renderCell(
                  v,
                  "typeOfEmployment",
                  "select",
                  EMPLOYMENT_OPTIONS
                )}
              </td>
              <td>{renderCell(v, "status", "select", STATUS_OPTIONS)}</td>
              <td>{renderCell(v, "link", "url")}</td>
              <td>{v.business?.name ?? "-"}</td>
              <td>
                <DeleteVacancyButton
                  vacancyId={v.id}
                  onDeleted={() =>
                    setData((prev) => prev.filter((item) => item.id !== v.id))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
