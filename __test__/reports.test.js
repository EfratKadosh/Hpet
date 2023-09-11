const client = require('../../db/db')
const request = require('supertest');
const app = require('../../index')


describe("POST /reports/uploadReport", () => {
    it("It should respond 'report is created successfully'", async () => {
        const User = await request(app).post("/reports/uploadReport").send({
            phone_number: '0528287761',
            name: 'bell',
            appointment_type: 'lab',
            report: 'test1',
        });
        expect(User.body.message).toBe("report is created successfully");
        expect(User.statusCode).toBe(200);

    });
});

describe("POST /reports/uploadReport", () => {
    it("It should respond 'user is not found'", async () => {
        const User = await request(app).post("/reports/uploadReport").send({
            phone_number: '0526640167',
            name: 'bell',
            appointment_type: 'lab',
            report: 'test1',

        });
        expect(User.body.message).toBe("user is not found");
        expect(User.statusCode).toBe(400);

    });
});

describe("POST /reports/uploadReport", () => {
    it("It should respond 'pet is not found'", async () => {
        const User = await request(app).post("/reports/uploadReport").send({
            phone_number: '0528287761',
            name: 'dor',
            appointment_type: 'lab',
            report: 'test1',

        });
        expect(User.body.message).toBe("pet is not found");
        expect(User.statusCode).toBe(400);

    });
});

describe("POST /reports/uploadReport", () => {
    it("It should respond 'error'", async () => {
        const User = await request(app).post("/reports/uploadReport").send({
            phone_number: '0528287761',
            name: 'bell',
            appointment_type: 'lab',
        });
        expect(User.body.message).toBe("error");
        expect(User.statusCode).toBe(400);

    });
});

describe("GET /reports/viewMedical", () => {
    it("It should respond with an array of reports", async () => {
        const response = await request(app).get("/reports/viewMedical/0528287761/bell");
        expect(response.body[0]).toHaveProperty("type");
        expect(response.body[0]).toHaveProperty("report");
        expect(response.body[0]).toHaveProperty("date");
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /reports/viewMedical", () => {
    it("It should respond 'user is not found'", async () => {
        const response = await request(app).get("/reports/viewMedical/0528287721/bell");
        expect(response.body.message).toBe("user is not found");
        expect(response.statusCode).toBe(400);
    });
});


describe("GET /reports/viewMedical", () => {
    it("It should respond 'pet is not found'", async () => {
        const response = await request(app).get("/reports/viewMedical/0528287761/bop");
        expect(response.body.message).toBe("pet is not found");
        expect(response.statusCode).toBe(400);
    });
});
