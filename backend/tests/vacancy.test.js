import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app.js";

let mongoServer;
let businessId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri); // 👉 Sem options antigas
    // Criar business antes dos testes de vacancy
  const createBusinessMutation = `
    mutation {
      createBusiness(input: { name: "Empresa Vacancy", city: "Faro" }) {
        id
      }
    }
  `;

  const res = await request(app).post("/graphql").send({ query: createBusinessMutation });
  businessId = res.body.data.createBusiness.id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Vacancy GraphQL Tests", () => {
  let vacancyId;

  test("Create a vacancy", async () => {

    expect(businessId).toBeDefined();

    const mutation = `
      mutation {
        createVacancy(input: { position: "Desenvolvedor", location:"Porto",timeOfResponse:"3 Meses",typeOfEmployment:"Hybrid",link:"linkdn", businessId: "${businessId}" }) {
          id
          position
          location
          timeOfApplication
          timeOfResponse
          typeOfEmployment
          link
          status
          businessId
        }
      }
    `;

    const res = await request(app).post("/graphql").send({ query: mutation });
    const vacancy = res.body.data.createVacancy;

    expect(vacancy.position).toBe("Desenvolvedor");
    expect(vacancy.location).toBe("Porto");
    expect(vacancy.timeOfResponse).toBe("3 Meses");
    expect(vacancy.typeOfEmployment).toBe("Hybrid");
    expect(vacancy.link).toBe("linkdn");
    expect(vacancy.status).toBe("No response");
    expect(vacancy.businessId).toBe(businessId);

    vacancyId = vacancy.id;
  });

  test("Update vacancy", async () => {
    const mutation = `
      mutation {
        updateVacancy(
          id: "${vacancyId}"
          input: { position: "Desenvolvedor Front-end", location:"Lisbon",timeOfResponse:"2 Meses",typeOfEmployment:"Remote",link:"email",status:"Rejected" }) {
          id
          position
          location
          timeOfApplication
          timeOfResponse
          typeOfEmployment
          link
          status
          businessId
        }
      }
    `;

    const res = await request(app).post("/graphql").send({ query: mutation });

    expect(res.body.data.updateVacancy.position).toBe("Desenvolvedor Front-end");
    expect(res.body.data.updateVacancy.location).toBe("Lisbon");
    expect(res.body.data.updateVacancy.timeOfResponse).toBe("2 Meses");
    expect(res.body.data.updateVacancy.typeOfEmployment).toBe("Remote");
    expect(res.body.data.updateVacancy.link).toBe("email");
    expect(res.body.data.updateVacancy.status).toBe("Rejected");
    
  });

  test("Delete Vacancy", async () => {
    const mutation = `
    mutation {
      deleteVacancy(id: "${vacancyId}")
    }
  `;

    const res = await request(app).post("/graphql").send({ query: mutation });

    expect(res.body.data.deleteVacancy).toBe("Vacancy deleted");
  });
});
