const client = require('../../db/db')
const request = require('supertest');
const app = require('../../index')


describe("POST /vaccines/updateVaccein", () => {
    it("It should respond 'vaccines is created successfully'", async () => {
        const User = await request(app).post("/vaccines/updateVaccein").send({
            phone_number: '0528287761',
            petname: 'bell',
            vaccine_type: 'משושה 1',

        });
        expect(User.body.message).toBe("vaccines is created successfully");
        expect(User.statusCode).toBe(200);

    });
});

describe("POST /vaccines/updateVaccein", () => {
    it("It should respond 'Somthing wrong'", async () => {
        const User = await request(app).post("/vaccines/updateVaccein").send({
            phone_number: '0528287761',
            petname: 'bell'
        });
        expect(User.body.message).toBe("Somthing wrong");
        expect(User.statusCode).toBe(400);

    });
});

describe("POST /vaccines/updateVaccein", () => {
    it("It should respond 'user is not found'", async () => {
        const User = await request(app).post("/vaccines/updateVaccein").send({
            phone_number: '0528287768',
            petname: 'bell',
            vaccine_type: 'משושה 1',

        });
        expect(User.body.message).toBe("user is not found");
        expect(User.statusCode).toBe(400);

    });
});

describe("POST /vaccines/updateVaccein", () => {
    it("It should respond 'pet is not found'", async () => {
        const User = await request(app).post("/vaccines/updateVaccein").send({

            phone_number: '0528287761',
            petname: 'sos',
            vaccine_type: 'משושה 1',

        });
        expect(User.body.message).toBe("pet is not found");
        expect(User.statusCode).toBe(400);

    });
});

describe("GET /vaccines/watchVacc", () => {
    it("It's Ok!", async () => {
        const response = await request(app).get("/vaccines/watchVacc/0528287761/bell");
        expect(response.body[0]).toHaveProperty("vaccine_type");
        expect(response.body[0]).toHaveProperty("date");
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /vaccines/watchVacc", () => {
    it("It should respond 'user is not found'", async () => {
        const response = await request(app).get("/vaccines/watchVacc/0528287761/boni");
        expect(response.body.message).toBe("pet is not found");
        expect(response.statusCode).toBe(400);
    });
});

describe("GET /vaccines/watchVacc", () => {
    it("user is not found", async () => {
        const response = await request(app).get("/vaccines/watchVacc/0528287771/bell");
        expect(response.body.message).toBe("user is not found");
        expect(response.statusCode).toBe(400);
    });
});
