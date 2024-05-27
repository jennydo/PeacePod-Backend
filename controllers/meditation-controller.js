require('dotenv').config({ path: '../../.env' });
const axios = require('axios');
const { generateMeditationSession } = require('../utils/apis/openaiUtils')
const MeditationAudio = require('../models/meditation-audio-model');
const Session = require('../models/sessions-model');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dufirricm',
    api_key: '237374651823171',
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// MEDITATION AUDIO
// Create a meditation audio based on user request
const createMeditationAudio = async (req, res) => {
    // Generate text using OpenAI API
    const { title, duration, mood, tone, extraNotes } = req.body

    if (!duration || !mood || !tone) {
        return res.status(400).json({ error: "Missing fields." })
    }

    // Validate title for a valid MP3 filename
    if (!title || /[/\\:*?"<>|]/.test(title)) {
        return res.status(400).json({ error: "Invalid or missing title for MP3 filename." });
    }

    if (title.length > 255) {
        return res.status(400).json({ error: "Title is too long." });
    }

    let audioContent = "Hi PeacePod";
    try {
        audioContent = await generateMeditationSession({ duration, mood, tone, extraNotes })
        console.log("Meditation session content: ", audioContent)
    } catch (error) {
        // Handle errors appropriately
        res.status(500).send(error.message);
    }

    const bodyAudioGeneration = {
        "generatedText": audioContent
    }

    try {
        // Generate audio data from your local server
        const audioResponse = await axios.post('http://localhost:4000/api/meditation/audios/text-to-audio', bodyAudioGeneration, { responseType: 'arraybuffer' });

        // Convert arraybuffer to a readable stream, required by Cloudinary
        // Thanh note: A buffer is a temporary storage location for data while it is being moved from one place to another
        const audioStream = Buffer.from(audioResponse.data);

        // Upload audio to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload_stream({
            resource_type: 'video', // Use 'video' resource type for audio files
            folder: 'PeacePod/Audios-Users', // Specify your target folder
            public_id: title
        }, (error, result) => {
            if (error) return res.status(500).json({ error: error.message });
            // Successfully uploaded to Cloudinary
            console.log('Uploaded file URL:', result.url);
            res.json({ File: title, url: result.url });
        });

        // Pipe audio stream to Cloudinary upload
        const streamUpload = cloudinaryResponse.end(audioStream);

    } catch (error) {
        console.log('Audio generation or upload error:', error);
        res.status(500).send(error.message);
    }
};



// Get all Audios of the given user
const getAllAudio = async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    let allAudio;
    try {
        allAudio = await MeditationAudio.find({ userId: userId }).sort({
            createdAt: -1,
        });
    } catch (error) {
        return res.status(500).json({ error: "Unable to get all audio" });
    }

    res.status(200).json(allAudio);
};

// Get one Audio
const getAudio = async (req, res) => {
    if (!req.params.audioId) {
        return res.status(400).json({ error: "Audio not found." });
    }

    const audioId = req.params.audioId;

    if (!mongoose.Types.ObjectId.isValid(audioId)) {
        return res.status(400).json({ error: "Audio not found." });
    }

    let audio;
    try {
        audio = await MeditationAudio.findById(audioId);
    } catch (error) {
        return res.status(500).send(error.message);
    }

    if (!audio) {
        return res.status(404).json({ error: "Audio not found." });
    }

    res.status(200).json(audio);
};

// SESSION
// Create Session
const createSession = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const userId = req.user._id;

    const { uploadedBackgrounds, lastBackground, meditationAudio, music, isPlayingAudio } = req.body;

    if (!userId || !lastBackground || isPlayingAudio === undefined) {
        return res.status(400).json({ error: "Missing fields" });
    }

    let session;
    try {
        session = await Session.create({
            userId,
            lastBackground,
            meditationAudio,
            music,
            isPlayingAudio,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json(session);
};

// Get User Session
const getUserSession = async (req, res) => {
    // const { userId } = req.body;

    // if (!userId) {
    //   console.log("UserId param not sent with request");
    //   return res.sendStatus(400);
    // }

    const userId = req.user._id;

    let sessions;
    try {
        sessions = await Session.find({ userId: userId });
    } catch (error) {
        return res.status(500).json({ error: "Unable to get session" });
    }

    if (!sessions || sessions.length === 0) {
        return res.status(404).json({ error: "No session" });
    }

    res.status(200).json(sessions);
};

// Get User Last Session
const getUserLastSession = async (req, res) => {
    //   const { userId } = req.body;

    //   if (!userId) {
    //     console.log("UserId param not sent with request");
    //     return res.sendStatus(400);
    //   }

    const userId = req.user._id;

    let lastSession;
    try {
        const allSessions = await Session.find({ userId }).populate('meditationAudio');
        lastSession = allSessions[allSessions.length - 1]

    } catch (error) {
        return res.status(500).json({ error: "Unable to get the last session" });
    }

    if (!lastSession) {
        return res.status(404).json({ error: "No session" });
    }

    res.status(200).json(lastSession);
};

// /// @route POST /api/meditation/sessions
// /// @desc Get a new meditation session based on requests
// /// @access Private
// const getSession = async (req, res) => {
//     const { duration, mood, tone, extraNotes } = req.body

//     if (!duration || !mood || !tone)
//     {
//         return res.status(400).json({ error: "Missing fields."})
//     }

//     try {
//         const session = await generateMeditationSession({ duration, mood, tone, extraNotes })
//         console.log("meditation session ", session)
//         return res.status(201).json(session)
//     } catch (error) {
//         return res.status(400).json({ error })
//     }
// }

module.exports = {
    createMeditationAudio,
    getAllAudio,
    getAudio,
    createSession,
    getUserSession,
    getUserLastSession,
};
