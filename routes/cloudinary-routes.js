const express = require('express')
const { getCloudinaryImages, getCloudinaryAudios, getCloudinaryAudio } = require('../utils/apis/cloudinary');
// const requireAuth = require('../middleware/requireAuth');

const cloudinaryRouter = express.Router();

// cloudinaryRouter.use(requireAuth);

cloudinaryRouter.get("/", getCloudinaryImages);
cloudinaryRouter.get("/audios", getCloudinaryAudios);
cloudinaryRouter.get("/audios/most-recent", getCloudinaryAudio);


module.exports = cloudinaryRouter


