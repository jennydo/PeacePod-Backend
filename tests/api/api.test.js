const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
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
    await mongoose.disconnect();
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

    it("should return unauthorized", async () => {
        const response = await request(app)
            .get("/api/posts")
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Authorization token required.");
    });
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

    it("should return unauthorized", async () => {
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
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Authorization token required.");
    });
});

// describe("POST /api/posts/prompt", () => {
//     it("should generate a prompt", async () => {
//         const response = await request(app)
//             .post("/api/posts/prompt")
//             .send({
//                 userId: process.env.USER_ID_TEST
//             })
//             .set({
//                 Authorization: "bearer " + token,
//                 "Content-Type": "application/json",
//             });
//         expect(response.statusCode).toBe(201);
//         expect(response.body.content.length).toBeGreaterThan(0);
//     });

//     it("should return unauthorized", async () => {
//         const response = await request(app)
//             .post("/api/posts/prompt")
//             .send({
//                 userId: process.env.USER_ID_TEST
//             })
//         expect(response.statusCode).toBe(401);
//         expect(response.body.error).toBe("Authorization token required.");
//     });
// });

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
        const response = await request(app)
            .post("/api/chats")
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });    
        expect(response.statusCode).toBe(400);
        // expect(response.body.error).toBe("UserId param not sent with request");
    });
});

describe("GET /api/cloudinary", () => {
    it("should get all the images in cloudinary", async () => {
        const response = await request(app)
            .get("/api/cloudinary")
    
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(Array.isArray(response.body)).toBe(true);

        response.body.forEach(url => {
            console.log(url)
            expect(typeof url).toBe('string');
            expect(url).toMatch(/^https?:\/\/res\.cloudinary\.com\/dufirricm\/image\/.*$/);
        });
    });
});

describe("GET /api/cloudinary/audios/", () => {
    it("should get all the audios in cloudinary", async () => {
        const response = await request(app)
            .get("/api/cloudinary/audios")
    
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(Array.isArray(response.body)).toBe(true);
        response.body.forEach(url => {
            expect(typeof url).toBe('string');
            expect(url).toMatch(/^https?:\/\/res\.cloudinary\.com\/dufirricm\/video\/.*$/);
        });
    });

    it("should get the most recent audio in cloudinary", async () => {
        const response = await request(app)
            .get("/api/cloudinary/audios/most-recent")
    
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('string');
        expect(response.body).toMatch(/^https?:\/\/res\.cloudinary\.com\/dufirricm\/video\/.*$/);
    });
});