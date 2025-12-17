import {  useState } from "react";
import "./AddButtonStyle.css";
import CloseIcon from "./CloseIcon";


export default function AddBusinessButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    city: "",
  });

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
    if (!formData.name || !formData.city) {
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
            mutation createBusiness($input: BusinessInput!) {
              createBusiness(input: $input) {
                name
                city
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
        name: "",
        city: "",
      });
    } catch {
      setError("Erro ao criar empresa");
    }
  };

  /* ---------------- JSX ---------------- */

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add Business</button>

      {isOpen && (
        <>
          <div className="backdrop" onClick={() => setIsOpen(false)} />
          <div className="dialog">
            <button className="close" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>

            <h2>Add New Business</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="modalForm">
                <div className="form-group">
                  <p>Name</p>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <p>City</p>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

               
              </div>

              <div className="submitButtonContainer">
                <button type="submit" className="submitButton">
                  Add Business
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
