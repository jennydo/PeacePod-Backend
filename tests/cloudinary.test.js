const request = require("supertest");
const app = require("../app");

describe("GET /api/cloudinary", () => {
    it("should get all the images in cloudinary", async () => {
        const response = await request(app)
            .get("/api/cloudinary")

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(Array.isArray(response.body)).toBe(true);

        response.body.forEach(url => {
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