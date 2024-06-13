const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

let token;

/* Connecting to the database before each test suite. */
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    
    const response = await request(app).post("/api/users/login").send({
        username: process.env.USERNAME_TEST,
        password: process.env.PASSWORD_TEST,
    });
    
    token = response.body.token;
});

/* Closing database connection after each test suite. */
afterAll(async () => {
    await mongoose.connection.close();
});

describe("GET /api/posts", () => {
    it("should get all the posts", async () => {
        const response = await request(app)
            .get("/api/posts")
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });
    
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }, 10000);
});

describe("POST /api/posts", () => {
    it("should add a post to the database", async () => {
        const testTitle = "Unit Testing Post";
        const testContent = "lorem ipsum dolor sit amet";
        const testIsPrompt = false;

        const response = await request(app)
            .post("/api/posts")
            .send({
                title: testTitle, 
                content: testContent, 
                isPrompt: testIsPrompt
            })
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });
    
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(testTitle);
        expect(response.body.content).toBe(testContent);
        expect(response.body.isPrompt).toBe(testIsPrompt);
    });
});

describe("POST /api/posts/prompt", () => {
    it("should generate a prompt", async () => {
        const response = await request(app)
            .post("/api/posts/prompt")
            .send({
                userId: process.env.USER_ID_TEST
            })
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.content.length).toBeGreaterThan(0);
    });
});