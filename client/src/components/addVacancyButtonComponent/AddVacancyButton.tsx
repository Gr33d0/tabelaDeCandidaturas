import { useEffect, useState } from "react";
import "./AddButtonStyle.css";
import CloseIcon from "./CloseIcon";

type Business = {
  id: string;
  name: string;
};

export default function AddVacancyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [business, setBusiness] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    position: "",
    location: "",
    timeOfApplication: "",
    timeOfResponse: "",
    typeOfEmployment: "",
    link: "",
    businessId: "",
  });

  /* ---------------- BUSINESS LIST ---------------- */

  const getBusiness = async () => {
    try {
      const res = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              businesses {
                id
                name
              }
            }
          `,
        }),
      });

      const data = await res.json();

      if (data.errors) {
        setError(data.errors[0].message);
      } else {
        setBusiness(data.data.businesses);
      }
    } catch {
      setError("Erro ao buscar businesses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusiness();
  }, []);

  /* ---------------- FORM HANDLERS ---------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // validação mínima (GraphQL exige estes campos)
    if (
      !formData.position ||
      !formData.location ||
      !formData.timeOfResponse ||
      !formData.typeOfEmployment ||
      !formData.link ||
      !formData.businessId
    ) {
      setError("Preenche todos os campos obrigatórios");
      return;
    }

    await addVacancy(formData);
  };

  /* ---------------- MUTATION ---------------- */

  const addVacancy = async (input: typeof formData) => {
    try {
      const res = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation CreateVacancy($input: VacancyCreateInput!) {
              createVacancy(input: $input) {
                id
                position
              }
            }
          `,
          variables: { input },
        }),
      });

      const data = await res.json();
      console.log("RESPONSE:", data);

      if (data.errors) {
        setError(data.errors[0].message);
        return;
      }

      // sucesso
      setIsOpen(false);
      setFormData({
        position: "",
        location: "",
        timeOfApplication: "",
        timeOfResponse: "",
        typeOfEmployment: "",
        link: "",
        businessId: "",
      });
    } catch {
      setError("Erro ao criar vaga");
    }
  };

  /* ---------------- JSX ---------------- */

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add Vacancy</button>

      {isOpen && (
        <>
          <div className="backdrop" onClick={() => setIsOpen(false)} />
          <div className="dialog">
            <button className="close" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>

            <h2>Add New Vacancy</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="modalForm">
                <div className="form-group">
                  <p>Position</p>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <p>Location</p>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <p>Time of Application</p>
                  <input
                    type="text"
                    name="timeOfApplication"
                    value={formData.timeOfApplication}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <p>Time of Response</p>
                  <input
                    type="text"
                    name="timeOfResponse"
                    value={formData.timeOfResponse}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <p>Type of Employment</p>
                  <select
                    name="typeOfEmployment"
                    value={formData.typeOfEmployment}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Presencial">Presencial</option>
                  </select>
                </div>

                <div className="form-group">
                  <p>Link</p>
                  <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <p>Business</p>
                  <select
                    name="businessId"
                    value={formData.businessId}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="" disabled>
                      Select Business
                    </option>
                    {business.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="submitButtonContainer">
                <button type="submit" className="submitButton">
                  Add Vacancy
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
