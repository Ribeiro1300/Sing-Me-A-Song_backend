/* eslint-disable no-undef */
import "../src/setup.js";
import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database/database.js";

describe("POST /recommendations", () => {
  it("returns 201 for valid params", async () => {
    const body = { name: "Jhonatan", youtubeLink: "olá" };
    const result = await supertest(app).post("/recommendations").send(body);
    expect(result.status).toEqual(201);
  });
});

afterAll(() => {
  connection.end();
});
