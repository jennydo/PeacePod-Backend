require('dotenv').config({ path: '../../.env' });
const axios = require('axios');
const { generateMeditationSession } = require('../utils/apis/openaiUtils')


/// @route POST /api/meditation/sessions
/// @desc Get a new meditation session based on requests
/// @access Private
const getSession = async (req, res) => {
    const { duration, mood, tone, extraNotes } = req.body

    if (!duration || !mood || !tone)
    {
        return res.status(400).json({ error: "Missing fields."})
    }

    try {
        const session = await generateMeditationSession({ duration, mood, tone, extraNotes })   
        console.log("meditation session ", session)
        return res.status(201).json(session)     
    } catch (error) {
        return res.status(400).json({ error })
    }
}


// Create a voice meditation session based on user request
const createVoiceSession = async (req, res) => {
    // Generate text using OpenAI API
    const { duration, mood, tone, extraNotes } = req.body

    if (!duration || !mood || !tone)
    {
        return res.status(400).json({ error: "Missing fields."})
    } 

    var session = "Hi PeacePod";
    try {
        session = await generateMeditationSession({ duration, mood, tone, extraNotes })   
        console.log("meditation session ", session)
    } catch (error) {
        // Handle errors appropriately
        res.status(500).send(error.message);
    }


    // Generates voice session given the text input
    // Set the API key for ElevenLabs API
    const apiKey = process.env.ELEVEN_LABS_API_KEY;

    // ID of voice: Natasha - gentle meditation
    const voiceId = 'Atp5cNFg1Wj5gyKD7HWV';

    // API request options
    const apiRequestOptions = {
        method: 'POST',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_22050_32`,
        headers: {
            accept: 'audio/mpeg',
            'content-type': 'application/json',
            'xi-api-key': apiKey,
        },
        data: {"text":session,"voice_settings":{"stability":0.4,"similarity_boost":0.6}},
        responseType: 'arraybuffer', // Ensure Axios treats the response as binary data
    };

    try {
        // Sending the API request and waiting for response
        const apiResponse = await axios.request(apiRequestOptions);
        
        // Set the appropriate content type for the response
        res.setHeader('Content-Type', 'audio/mpeg');

        // Send the binary audio data received from API
        res.send(apiResponse.data);    

    } catch (error) {
        console.log("Elevenlabs API error")
        // Handle errors appropriately
        res.status(400).send(error.message);
    }
};

module.exports = { getSession, createVoiceSession }