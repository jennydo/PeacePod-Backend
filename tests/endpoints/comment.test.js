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

describe("GET /api/comments", () => {
    it("should get all the comments", async () => {
        const response = await request(app)
            .get(`/api/comments/post/${process.env.POST_ID_TEST}`)
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });
    
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("should return unauthorized", async () => {
        const response = await request(app)
            .get(`/api/comments/post/${process.env.POST_ID_TEST}`)
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Authorization token required.");
    });
});

describe("POST /api/comments", () => {
    it("should post a comment", async () => {
        const testComment = "Testing Comment"
        const response = await request(app)
            .post(`/api/comments/${process.env.POST_ID_TEST}`)
            .send({
                content: testComment,
            })
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });
    
        expect(response.statusCode).toBe(200);
        expect(response.body.content).toBe(testComment);
        expect(response.body.postId).toBe(process.env.POST_ID_TEST);
        expect(response.body.userId._id).toBe(process.env.USER_ID_TEST);
    });

    it("should return unauthorized", async () => {
        const testComment = "Testing Comment"
        const response = await request(app)
            .post(`/api/comments/${process.env.POST_ID_TEST}`)
            .send({
                content: testComment,
            })
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Authorization token required.");
    });

    it("should return Your comment creation has error", async () => {
        let response;
        try {
            response = await request(app)
            .post(`/api/comments/${process.env.POST_ID_TEST}`)
            .send({ })
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });
        } catch (error) {
            expect(error).toBe("Your comment creation has error");
        }
          
        expect(response.statusCode).toBe(400);
    });
});