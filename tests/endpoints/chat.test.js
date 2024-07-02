const request = require("supertest");
const app = require("../../app");

let token;

beforeAll(async () => {
    const response = await request(app).post("/api/users/login").send({
        username: process.env.USERNAME_TEST,
        password: process.env.PASSWORD_TEST,
    });
    token = response.body.token;
});

describe("GET /api/chats", () => {
    it("should get all the chats", async () => {
        const response = await request(app)
            .get("/api/chats")
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("should return unauthorized", async () => {
        const response = await request(app)
            .get("/api/chats")
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Authorization token required.");
    });
});

describe("POST /api/chats", () => {
    it("should access a chat", async () => {
        const response = await request(app)
            .post("/api/chats")
            .send({
                userId: process.env.USER2_ID_TEST
            })
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.isGroupChat).toBe(false);
        expect(response.body.users).toHaveLength(2);
        expect(response.body.users.every(user => typeof user === 'object')).toBe(true);    
    });

    it("should return unauthorized", async () => {
        const response = await request(app)
            .post("/api/chats")
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Authorization token required.");
    });

    it("should return UserId param not sent with request", async () => {
        let response;
        try {
            response = await request(app)
            .post("/api/chats")
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });  
        } catch (error) {
            expect(error).toBe("UserId param not sent with request");
        }

        expect(response.statusCode).toBe(400);
    });
});