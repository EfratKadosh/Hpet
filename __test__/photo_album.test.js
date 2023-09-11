const client = require('../../db/db')
const request = require('supertest');
const app = require('../../index')


describe("GET /photo/watchAlbum", () => {
    it("It's Ok!", async () => {
        const response = await request(app).get("/photo/watchAlbum/0528287761/bell");
        expect(response.body[0]).toHaveProperty("url");
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /photo/watchAlbum", () => {
    it("It should respond 'user is not found'", async () => {
        const response = await request(app).get("/photo/watchAlbum/0528287771/bell");
        expect(response.body.message).toBe("user is not found");
        expect(response.statusCode).toBe(400);
    });
});

describe("GET /photo/watchAlbum", () => {
    it("It should respond 'pet is not found'", async () => {
        const response = await request(app).get("/photo/watchAlbum/0528287761/sos");
        expect(response.body.message).toBe("pet is not found");
        expect(response.statusCode).toBe(400);
    });
});
