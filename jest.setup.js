// Import dotenv to use environment variables in tests
require('dotenv').config({ path: '.env.test' });
const mongoose = require("mongoose");
const https = require('https');

/* Connecting to the database before each test suite. */
beforeAll(async () => {
    // await mongoose.connect(process.env.MONGO_URI_TEST || process.env.MONGO_URI);
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI_TEST || process.env.MONGO_URI);
    }
});

/* Closing database connection after each test suite. */
afterAll(async () => {
    // await mongoose.disconnect();
    await mongoose.connection.close();
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // wait for 500ms
    https.globalAgent.destroy();
});