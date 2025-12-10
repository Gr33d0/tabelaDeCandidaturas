import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri); // 👉 Sem options antigas
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Business GraphQL Tests", () => {
  let businessId;

  test("Create a business", async () => {
    const mutation = `
      mutation {
        createBusiness(input: { name: "Empresa Teste", city: "Lisboa" }) {
          id
          name
          city
        }
      }
    `;

    const res = await request(app).post("/graphql").send({ query: mutation });

    const business = res.body.data.createBusiness;

    expect(business.name).toBe("Empresa Teste");
    expect(business.city).toBe("Lisboa");

    businessId = business.id;
  });

  test("Update business", async () => {
    const mutation = `
      mutation {
        updateBusiness(
          id: "${businessId}"
          input: { name: "Empresa Atualizada", city: "Porto" }
        ) {
          id
          name
          city
        }
      }
    `;

    const res = await request(app).post("/graphql").send({ query: mutation });

    expect(res.body.data.updateBusiness.name).toBe("Empresa Atualizada");
    expect(res.body.data.updateBusiness.city).toBe("Porto");
  });

  test("Delete business", async () => {
    const mutation = `
    mutation {
      deleteBusiness(id: "${businessId}")
    }
  `;

    const res = await request(app).post("/graphql").send({ query: mutation });

    expect(res.body.data.deleteBusiness).toBe("Business deleted");
  });
});
