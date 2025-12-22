import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app.js";

let mongoServer;
let businessId;
let vacancyId;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
  // Criar business antes dos testes de vacancy
  const createBusinessMutation = `
    mutation {
      createBusiness(input: { name: "Empresa Vacancy", city: "Faro" }) {
        id
      }
    }
  `;

  const res = await request(app)
    .post("/graphql")
    .send({ query: createBusinessMutation });
  expect(res.body.data.createBusiness).toBeDefined();
  expect(res.body.data.createBusiness.id).toBeDefined();
  expect(res.body.data.createBusiness.id).not.toBe("");

  businessId = res.body.data.createBusiness.id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Vacancy GraphQL Tests", () => {

  test("Create a vacancy", async () => {
    expect(businessId).toBeDefined();

    const mutation = `
      mutation createVacancy($input: VacancyCreateInput!){
        createVacancy(input: $input) {
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

    const variables = {
      input: {
        position: "Desenvolvedor",
        location: "Porto",
        timeOfResponse: "3 Meses",
        typeOfEmployment: "Hybrid",
        link: "linkdn",
        businessId: businessId, // use o ID criado antes
      },
    };

    const res = await request(app)
      .post("/graphql")
      .send({ query: mutation, variables });

    expect(res.body.data.createVacancy).toBeDefined();
    expect(res.body.data.createVacancy.id).not.toBe("");
    vacancyId = res.body.data.createVacancy.id

    expect(res.body.data.createVacancy.position).toBe("Desenvolvedor");
    expect(res.body.data.createVacancy.location).toBe("Porto");
    expect(res.body.data.createVacancy.timeOfResponse).toBe("3 Meses");
    expect(res.body.data.createVacancy.typeOfEmployment).toBe("Hybrid");
    expect(res.body.data.createVacancy.link).toBe("linkdn");
    expect(res.body.data.createVacancy.status).toBe("No response");
    expect(res.body.data.createVacancy.businessId).toBe(businessId);
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

    expect(res.body.data.updateVacancy.position).toBe(
      "Desenvolvedor Front-end"
    );
    expect(res.body.data.updateVacancy.location).toBe("Lisbon");
    expect(res.body.data.updateVacancy.timeOfResponse).toBe("2 Meses");
    expect(res.body.data.updateVacancy.typeOfEmployment).toBe("Remote");
    expect(res.body.data.updateVacancy.link).toBe("email");
    expect(res.body.data.updateVacancy.status).toBe("Rejected");
  });

  //Delete precisa de ser o ultimo teste
    test("Delete Vacancy", async () => {
    expect(vacancyId).toBeDefined();
    expect(vacancyId).not.toBe("");

    const mutation = `
    mutation {
      deleteVacancy(id: "${vacancyId}")
    }
  `;

    const res = await request(app).post("/graphql").send({ query: mutation });
    expect(res.body.data.deleteVacancy).toBeDefined();
    expect(res.body.data.deleteVacancy).not.toBe("");
    expect(res.body.data.deleteVacancy).toBe("Vacancy deleted");
  });
});
