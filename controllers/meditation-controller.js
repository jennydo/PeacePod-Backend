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

module.exports = { getSession }