import mongoose from "mongoose";

const VacancySchema = new mongoose.Schema({
  // Título da vaga
  position: {
    type: String,
    required: true,
    unique: true,
  },
  // Remote/Presential/Hybrid
  location: {
    type: String,
    required: true,
  },
  //time of application
  timeOfApplication: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // tempo de resposta
  timeOfResponse: {
    type: String,
    required: true,
  },
  // contato da vaga
  typeOfEmployment: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "No response",
  },

  // Não incluímos a lista de Vagas aqui, pois usaremos referências.
});

// O nome do modelo 'Vacancy' será usado para referenciar em outros modelos.
export const VacancyModel = mongoose.model("Vacancy", VacancySchema);