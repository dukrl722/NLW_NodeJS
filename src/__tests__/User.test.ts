import request from 'supertest';
import { app } from '../app';
import createConnection from "../database";


describe("User", () => {
    /**
     * primeiro deve ser rodada as migrations, caso contrário
     * não haverá nenhuma coluna nas tabelas
     */
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });
    
    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "dukrl222@hotmail.com",
            name: "Eduardo"
        });

        expect(response.status).toBe(201);
    });

    it("Should not to be able to create a user with exists email", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "dukrl222@hotmail.com",
            name: "Eduardo"
        });

        expect(response.status).toBe(400);
    });
});