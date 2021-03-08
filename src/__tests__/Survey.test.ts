import request from 'supertest';
import { app } from '../app';
import createConnection from "../database";


describe("Surveys", () => {
    /**
     * primeiro deve ser rodada as migrations, caso contrário
     * não haverá nenhuma coluna nas tabelas
     */
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });
    
    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys")
        .send({
            title: "title",
            description: "description"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys")
        .send({
            title: "title2",
            description: "description2"
        });

        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    })
});