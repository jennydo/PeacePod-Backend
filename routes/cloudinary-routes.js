const express = require('express')
const { getCloudinaryImages, getCloudinaryAudios, getCloudinaryAudio, getCloudinaryPostImages } = require('../utils/apis/cloudinary');
// const requireAuth = require('../middleware/requireAuth');

const cloudinaryRouter = express.Router();

// cloudinaryRouter.use(requireAuth);

cloudinaryRouter.get("/", getCloudinaryImages);
cloudinaryRouter.get("/audios", getCloudinaryAudios);
cloudinaryRouter.get("/audios/most-recent", getCloudinaryAudio);
cloudinaryRouter.get("/postImages", getCloudinaryPostImages);


module.exports = cloudinaryRouter


