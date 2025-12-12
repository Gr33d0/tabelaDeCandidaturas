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

  await mongoose.connect(uri); // 👉 Sem options antigas
    // Criar business antes dos testes de vacancy
  const createBusinessMutation = `
    mutation {
      createBusiness(input: { name: "Empresa Vacancy", city: "Faro" }) {
        id
      }
    }
  `;

  const resBusiness = await request(app).post("/graphql").send({ query: createBusinessMutation });
  businessId = resBusiness.body.data.createBusiness.id;

  const createVacancyMutation = `
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
    const resVacancy = await request(app).post("/graphql").send({ query: createVacancyMutation });
    vacancyId = resVacancy.body.data.createVacancy.id;
});


afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Root GraphQL Tests", () => {
  test("Fetch all businesses", async () => {
    const query = `query {
      businesses {
        id
        name
        city
        vacancies {
          id
        }
      }
    }`;

    const res = await request(app).post("/graphql").send({ query });   
    const businesses = res.body.data.businesses;

    expect(businesses.length).toBeGreaterThan(0);
  });
    test("Fetch all vacancies", async () => {
    const query = `query {
      vacancies {
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
    }`;
    const res = await request(app).post("/graphql").send({ query });   
    const vacancies = res.body.data.vacancies;
    expect(vacancies.length).toBeGreaterThan(0);
    });
    test("Fetch business by ID", async () => {
    const query = `query {
      business(id: "${businessId}") {
        id
        name
        city
        vacancies {
          id
        }
        }
    }`;

    const res = await request(app).post("/graphql").send({ query });   
    const business = res.body.data.business;
    expect(business).toBeDefined();
    expect(business.id).toBe(businessId);
    });
    test("Fetch vacancy by ID", async () => {
    const query = `query {
        vacancy(id: "${vacancyId}") {
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
    }`; 
    const res = await request(app).post("/graphql").send({ query });   
    const vacancy = res.body.data.vacancy;
    expect(vacancy).toBeDefined();
    expect(vacancy.id).toBe(vacancyId);
    });



});
  