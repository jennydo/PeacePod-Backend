const express = require('express')
const { getCloudinaryImages } = require('../utils/apis/cloudinary');
// const requireAuth = require('../middleware/requireAuth');

const cloudinaryRouter = express.Router();

// cloudinaryRouter.use(requireAuth);

cloudinaryRouter.get("/", getCloudinaryImages);

module.exports = cloudinaryRouter


