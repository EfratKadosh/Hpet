const client = require('../../db/db')
const request = require('supertest');
const app = require('../../index')

// describe("POST /pets/petRegister", () => {
//     it("It should respond 'New pet created successfully'", async () => {
//         const newPet = await request(app).post("/pets/petRegister").send({
//             phone_number: '0528287761',
//             name: 'rup',
//             breed: 'milow',
//             chip_number: '',
//             birthday: '11/02/2009',
//             gender: 'famle',
//             type: 'dog'
//         });
//         expect(newPet.body.message).toBe("New pet created successfully");
//         expect(newPet.statusCode).toBe(200);

//     });
// });

describe("POST /pets/petRegister", () => {
    it("It should respond 'pet is exist'", async () => {
        const newPet = await request(app).post("/pets/petRegister").send({
            phone_number: '0528287761',
            name: 'bell',
            breed: 'milow',
            chip_number: '',
            birthday: '11/02/2009',
            gender: 'famle',
            type: 'dog'
        });
        expect(newPet.body.message).toBe("pet is exist");
        expect(newPet.statusCode).toBe(400);

    });
});

describe("POST /pets/petRegister", () => {
    it("It should respond 'user is not found'", async () => {
        const newPet = await request(app).post("/pets/petRegister").send({
            phone_number: '0528287768',
            name: 'we',
            breed: 'milow',
            chip_number: '',
            birthday: '11/02/2009',
            gender: 'famle',
            type: 'dog'
        });
        expect(newPet.body.message).toBe("user is not found");
        expect(newPet.statusCode).toBe(400);

    });
});

describe("GET /pets/watchPatients", () => {
    it("It should respond with an array of pets", async () => {
        const response = await request(app).get("/pets/watchPatients");
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("breed");
        expect(response.body[0]).toHaveProperty("gender");
        expect(response.body[0]).toHaveProperty("type");
        expect(response.body[0]).toHaveProperty("birthday");
        expect(response.statusCode).toBe(200);
    });
});


describe("GET /pets/byuser", () => {
    it("It Ok", async () => {
        const response = await (await request(app).get("/pets/byuser/0528287761"));
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("breed");
        expect(response.body[0]).toHaveProperty("chip_number");
        expect(response.body[0]).toHaveProperty("birthday");
        expect(response.body[0]).toHaveProperty("gender");
        expect(response.body[0]).toHaveProperty("type");
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /pets/byuser", () => {
    it("It should respond 'user is not found'", async () => {
        const response = await (await request(app).get("/pets/byuser/0528287768"));
        expect(response.body.message).toBe("user is not found");
        expect(response.statusCode).toBe(400);
    });
});

describe("GET /pets/petbyuser", () => {
    it("It should respond with an array of pets", async () => {
        const response = await (await request(app).get("/pets/petbyuser/0528287761/bll"));
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("breed");
        expect(response.body[0]).toHaveProperty("chip_number");
        expect(response.body[0]).toHaveProperty("birthday");
        expect(response.body[0]).toHaveProperty("gender");
        expect(response.body[0]).toHaveProperty("type");
        expect(response.statusCode).toBe(200);
    });
});


describe("GET /pets/petbyuser", () => {
    it("It should respond 'user is not found'", async () => {
        const response = await (await request(app).get("/pets/petbyuser/0528287768/bll"));
        expect(response.body.message).toBe("user is not found");
        expect(response.statusCode).toBe(400);
    });
});


describe("GET /pets/petbyuser", () => {
    it("It should respond 'pet is not found'", async () => {
        const response = await (await request(app).get("/pets/petbyuser/0528287761/loli"));
        expect(response.body.message).toBe("pet is not found");
        expect(response.statusCode).toBe(400);
    });
});

describe("GET /pets/updateStatus", () => {
    it("It should respond 'update successfully!'", async () => {
        const response = await (await request(app).get("/pets/updateStatus/0528287761/bell"));
        expect(response.body.message).toBe("update successfully!");
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /pets/updateStatus", () => {
    it("It should respond 'pet is not exist'", async () => {
        const response = await (await request(app).get("/pets/updateStatus/0528287761/rotem"));
        expect(response.body.message).toBe("pet is not exist");
        expect(response.statusCode).toBe(400);
    });
});

describe("GET /pets/updateStatus", () => {
    it("It should respond 'user is not found'", async () => {
        const response = await (await request(app).get("/pets/updateStatus/0528287768/bll"));
        expect(response.body.message).toBe("user is not found");
        expect(response.statusCode).toBe(400);
    });
});
