require('dotenv').config({ path: '../../.env' });
const axios = require('axios');
const { generateMeditationSession } = require('../utils/apis/openaiUtils')
const MeditationAudio = require('../models/meditation-audio-model');
const Session = require('../models/sessions-model');


// MEDITATION AUDIO
// Create a meditation audio based on user request
const createMeditationAudio = async (req, res) => {
    // Generate text using OpenAI API
    const { duration, mood, tone, extraNotes } = req.body

    if (!duration || !mood || !tone)
    {
        return res.status(400).json({ error: "Missing fields."})
    } 

    let audioContent = "Hi PeacePod";
    try {
        audioContent = await generateMeditationSession({ duration, mood, tone, extraNotes })   
        console.log("meditation session content", audioContent)
    } catch (error) {
        // Handle errors appropriately
        return res.status(500).json({ message: error.message});
    }


    // Generates voice session given the text input
    // Set the API key for ElevenLabs API
    const apiKey = process.env.ELEVEN_LABS_API_KEY;

    // ID of voice: Natasha - gentle meditation
    // const voiceId = 'Atp5cNFg1Wj5gyKD7HWV';
    // ID of voice: Grace - gentle, southern american
    const voiceId = 'oWAxZDx7w5VEj9dCyTzz'

    // API request options
    const apiRequestOptions = {
        method: 'POST',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_22050_32`,
        headers: {
            accept: 'audio/mpeg',
            'content-type': 'application/json',
            'xi-api-key': apiKey,
        },
        data: {"text":audioContent,"voice_settings":{"stability":0.4,"similarity_boost":0.6}},
        responseType: 'arraybuffer', // Ensure Axios treats the response as binary data
    };

    try {
        // Sending the API request and waiting for response
        const apiResponse = await axios.request(apiRequestOptions);
        
        // Set the appropriate content type for the response
        res.setHeader('Content-Type', 'audio/mpeg');

        // Send the binary audio data received from API
        return res.send(apiResponse.data);    

    } catch (error) {
        console.log("Elevenlabs API error")
        // Handle errors appropriately
        return res.status(400).json({message: error});
    }
};




// Get all Audios of the given user
const getAllAudio = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }


    let allAudio;
    try {
        allAudio = await MeditationAudio.find({userId: userId}).sort({createdAt: -1});
    } catch (error) {
        return res.status(500).json({ error: "Unable to get all audio" });
    }

    if (!allAudio || allAudio.length === 0) {
        return res.status(404).json({ error: "No audio" });
    }

    res.status(200).json(allAudio);
}


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
}



// SESSION
// Create Session
const createSession = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const userId = req.user._id

    const {  uploadedBackgrounds, lastBackground, meditationAudio, music, isPlayingAudio } = req.body;

    if (!userId || !uploadedBackgrounds || !lastBackground || isPlayingAudio === undefined) {
        return res.status(400).json({ error: "Missing fields" });
    }

    let session;
    try {
        session = await Session.create({ uploadedBackgrounds, lastBackground, meditationAudio, music, isPlayingAudio });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json(session);
}


// Get User Session
const getUserSession = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }


    let sessions;
    try {
        sessions = await Session.find({userId: userId});
    } catch (error) {
        return res.status(500).json({ error: "Unable to get session" });
    }

    if (!sessions || sessions.length === 0) {
        return res.status(404).json({ error: "No session" });
    }

    res.status(200).json(sessions);
}


// Get User Last Session
const getUserLastSession = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }


    let lastSession;
    try {
        lastSession = await Session.find({userId: userId})[-1];
    } catch (error) {
        return res.status(500).json({ error: "Unable to get the last session" });
    }

    if (!lastSession) {
        return res.status(404).json({ error: "No session" });
    }

    res.status(200).json(lastSession);
}






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


module.exports = { createMeditationAudio, getAllAudio, getAudio, createSession, getUserSession, getUserLastSession }