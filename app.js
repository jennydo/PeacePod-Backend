require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');


const usersRouter = require('./routes/users-routes')


const app = express()

app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.use('/api/users', usersRouter);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to Backend!' });
});


const QUOTES_API_KEY = 'vJ/1MlQhC1ST9yfeLUMFvA==gsFA4LTDN8EM1LCC' // process.env.QUOTES_API_KEY
const QUOTES_API = `https://api.api-ninjas.com/v1/quotes?category=happiness`

axios.get(QUOTES_API, {
    params: {
        'X-Api-Key': QUOTES_API_KEY 
    }
})
.then(response => {
    // Handle successful response
    print(response.data);
    return response.data;
})
.catch(error => {
    console.error('Error fetching quotes data:', error);
});

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 4000);
        console.log('Connected to DB and listening on port 4000')
    }
    )
    .catch((error) => {
        console.log(error)
    })