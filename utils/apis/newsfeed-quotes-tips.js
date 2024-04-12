require('dotenv').config({ path: '../../.env' });
const axios = require('axios');

const QUOTES_API_KEY = process.env.QUOTES_API_KEY
const QUOTES_API = 'https://api.api-ninjas.com/v1/quotes?category=happiness'

const getInsprirationalQuotes = async (req, res) => {
    try {
        const response = await axios.get(QUOTES_API, {
            headers: {
                'X-Api-Key': QUOTES_API_KEY
            }
        })
        const data = response.data;
        res.json(data);

    } catch(error) {
        res.status(500).json({ error: 'Failed to fetch quotes data from the API' });
    };
};

module.exports = {getInsprirationalQuotes};
