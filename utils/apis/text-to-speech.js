// const options = {
//     method: 'POST',
//     headers: {
//       'xi-api-key': 'b835f5af39baae5987e52f853c9794c8',
//       'Content-Type': 'application/json'
//     },
//     body: '{"voice_settings":{"stability":0.8,"similarity_boost":0},"text":"Hello PeacePod"}'
//   };
  
//   fetch('https://api.elevenlabs.io/v1/text-to-speech/piTKgcLEGmPE4e6mEKli', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


require('dotenv').config({ path: '../../.env' });
const axios = require('axios');


// Function to convert text to audio using ElevenLabs API
const convertTextToAudio = async (textToConvert) => {

    const ELEVEN_LABS_API_KEY = process.env.ELEVEN_LABS_API_KEY;
    const voiceId = 'piTKgcLEGmPE4e6mEKli'; // Nicole's voice
    const ELEVEN_LABS_API = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    try {
        const response = await axios.get(ELEVEN_LABS_API, {
            headers: {
                'X-Api-Key': QUOTES_API_KEY
            },
            body: {
                text: "Hello PeacePod" //textToConvert,
            },
            // responseType: 'arraybuffer', 
        })
        const data = response.data;
        res.json(data);

    } catch(error) {
        res.status(500).json({ error: 'Failed to fetch quotes data from the API' });
    };


    // // API request options
    // const apiRequestOptions = {
    // method: 'POST',
    // url: ELEVEN_LABS_API,
    // headers: {
    //     accept: 'audio/mpeg',
    //     'content-type': 'application/json',
    //     'xi-api-key': ELEVEN_LABS_API_KEY,
    // },
    // data: {
    //     text: "Hello PeacePod" //textToConvert,
    //   },
    //   responseType: 'arraybuffer', 
    // };

    // // Sending the API request and waiting for response
    // const apiResponse = await axios.request(apiRequestOptions);

    // // Return the binary audio data received from API
    // return apiResponse.data;
};

module.exports = {convertTextToAudio};
    