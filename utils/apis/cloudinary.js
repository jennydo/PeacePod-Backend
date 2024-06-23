const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dufirricm', 
  api_key: '237374651823171', 
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

// const uploadImage = async (req, res) => {
//     const { public_id } = req.body;
//     cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//         { public_id }, 
//         function (error, result) {
//             console.log(result); 
//     })

// }

const getCloudinaryImages = async (req, res) => {
    try {
        const folder = 'PeacePod/Backgrounds';
    
        const result = await cloudinary.search
          .expression(`folder:${folder}`)
          .execute();
    
        // console.log("result.resources", result.resources)
        // const publicIds = result.resources.map(resource => resource.public_id);
        const urls = result.resources.map(resource => resource.url); // or secure_url
    
        res.json(urls);
      } catch (error) {
        console.error('Error retrieving images:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getCloudinaryPostImages = async (req, res) => {
  try {
      const folder = 'PeacePod/PostcardBackground';
  
      const result = await cloudinary.search
        .expression(`folder:${folder}`)
        .execute();
  
      const urls = result.resources.map(resource => resource.url); // or secure_url
  
      res.json(urls);
    } catch (error) {
      console.error('Error retrieving images:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

// Folder path for Audio files
const audioFolderPath = 'Audios';
const fileType = 'mp3';

// Get all audio files from Cloudinary
const getCloudinaryAudios = async (req, res) => {
  try {
    const folder = 'PeacePod/Audios';

    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .execute();

    // console.log("result.resources", result.resources)
    // const publicIds = result.resources.map(resource => resource.public_id);
    const urls = result.resources.map(resource => resource.url); // or secure_url

    res.json(urls);
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getCloudinaryAudio = async (req, res) => {
  try {
    const folder = 'PeacePod/Audios';
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .execute();

    // Sort the resources by created_at in descending order
    const sortedResources = result.resources.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    // Get the URL of the latest uploaded file
    const latestFileUrl = sortedResources[0].url;

    res.json(latestFileUrl);
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getCloudinaryImages, getCloudinaryAudios, getCloudinaryAudio, getCloudinaryPostImages }
