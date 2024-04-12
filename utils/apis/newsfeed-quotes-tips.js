require('dotenv').config({ path: '../../.env' });
const axios = require('axios');

const QUOTES_API_KEY = process.env.QUOTES_API_KEY
const QUOTES_API = `https://api.api-ninjas.com/v1/quotes?category=happiness?key=${QUOTES_API_KEY}`

async function getInsprirationalQuotes(){
    axios.get(QUOTES_API)
    .then(response => {
        // Handle successful response
        print(response.data);
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching quotes data:', error);
    });
};

module.exports = getInsprirationalQuotes;
