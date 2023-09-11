const client = require('../../db/db')
const request = require('supertest');
const app = require('../../index')

// describe("POST /user/register", () => {
//     it("It should respond 'New user created successfully'", async () => {
//         const newUser = await request(app).post("/user/register").send({
//             user_name: 'ddi',
//             password: '123',
//             first_name: 'dori',
//             last_name: 'fourer',
//             email: 'ddi@gmail.com',
//             phone_number: '0648929226',
//             role: 1
//         });
//         expect(newUser.body.message).toBe("New user created successfully");
//         expect(newUser.statusCode).toBe(200);

//     });
// });

describe("POST /user/register", () => {
    it("It should respond 'Existing username or existing email or existing cell phone number'", async () => {
        const newUser = await request(app).post("/user/register").send({
            user_name: 'daniel12',
            password: '1234',
            first_name: 'daniel',
            last_name: 'grounin',
            email: 'daniel12@gmail.com',
            phone_number: '0528287761',
            role: 1
        });
        expect(newUser.body.message).toBe("Existing username or existing email or existing cell phone number");
        expect(newUser.statusCode).toBe(400);

    });
});

describe("POST /user/login", () => {
    it("It should respond 'login ok!'", async () => {
        const User = await request(app).post("/user/login").send({
            username: 'efrat',
            password: '123456',

        });
        expect(User.body.message).toBe("login ok!");
        expect(User.statusCode).toBe(200);

    });
});

describe("POST /user/login", () => {
    it("It should respond 'Wrong username or password'", async () => {
        const newUser = await request(app).post("/user/login").send({
            user_name: 'efrat',
            password: '123',

        });
        expect(newUser.body.message).toBe("Wrong username or password");
        expect(newUser.statusCode).toBe(400);

    });
});

describe("PUT /user/update", () => {
    it("It should respond 'edit failed!'", async () => {
        const newUser = await request(app).put("/user/update").send({
            name: 'efrat',
            lname: 'kadosh',
            email: 'efrat@gmail.com',
            phone: '0528287761',
            currentUser: 'efrat'
        });
        expect(newUser.body.message).toBe("phone number exist");
        expect(newUser.statusCode).toBe(400);

    });
});

describe("PUT /user/update", () => {
    it("It should respond 'email exist'", async () => {
        const newUser = await request(app).put("/user/update").send({
            name: 'efrat',
            lname: 'kadosh',
            email: 'yovel@gmail.com',
            phone: '0526640140',
            currentUser: 'efrat'
        });
        expect(newUser.body.message).toBe("email exist");
        expect(newUser.statusCode).toBe(400);

    });
});

describe("PUT /user/update", () => {
    it("It should respond 'edit ok!'", async () => {
        const newUser = await request(app).put("/user/update").send({
            name: 'ef',
            lname: 'kadosh',
            email: 'efrat@gmail.com',
            phone: '0526640140',
            currentUser: 'efrat',
        });
        expect(newUser.body.message).toBe("edit ok!");
        expect(newUser.statusCode).toBe(200);

    });
});
