require('dotenv').config({ path: '../../.env' });
const axios = require('axios');
const { restart } = require('nodemon');

// Function to convert text to audio using ElevenLabs API
const convertTextToAudio = async (req, res) => {
    // Set the API key for ElevenLabs API
    const apiKey = process.env.ELEVEN_LABS_API_KEY;

    // ID of voice: Natasha - gentle meditation
    const voiceId = 'Atp5cNFg1Wj5gyKD7HWV';

    const { generatedText } = req.body

    // API request options
    const apiRequestOptions = {
        method: 'POST',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_22050_32`,
        headers: {
            accept: 'audio/mpeg',
            'content-type': 'application/json',
            'xi-api-key': apiKey,
        },
        data: JSON.stringify({ text: generatedText, voice_settings: { stability: 0.4, similarity_boost: 0.6 } }),
        responseType: 'arraybuffer', // Ensure Axios treats the response as binary data
    };

    try {
        // Sending the API request and waiting for response
        const apiResponse = await axios.request(apiRequestOptions);
        
        // Set the appropriate content type for the response
        res.setHeader('Content-Type', 'audio/mpeg'); // Set the response content type to audio in MPEG format
        // Note: MPEG format is a popular audio format that is widely supported by most browsers and media players

        // Send the binary audio data received from API
        res.send(apiResponse.data);    

    } catch (error) {
        console.log("Elevenlabs API error");
        res.status(400).send(error.message);
    }
};

module.exports = { convertTextToAudio };