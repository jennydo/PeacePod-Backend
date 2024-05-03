const OpenAI = require('openai')
const Prompt = require('../../models/prompt-model')

const openai = new OpenAI()

/// Generate a new prompt daily
const generatePrompt = async () => {
    
    const prompt = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: "Give me a short writing prompt for people with mental health issues. Keep it in one sentence only and within 30 tokens. The prompt could be in form of questions or sentences or fictions",

        max_tokens: 30,
        temperature: 0.8
      });
    
    const promptContent = prompt.choices[0].text

    const currentPrompt = await Prompt.findOne({})
    
    console.log("old prompt ", currentPrompt.content)

    let newPrompt
    /// Already a prompt in DB -> update it
    if (currentPrompt)
    {
        newPrompt = await Prompt.findOneAndUpdate({}, { content: promptContent }, { new: true })
    } else {
        /// No prompt in DB yet
        newPrompt = await Prompt.create({ content: promptContent }) 
    }
    console.log("new prompt ", newPrompt.content)     
}

/// Generate meditation session 
const generateMeditationSession = async (requirements) => {

    const { duration, mood, tone, extraNotes } = requirements 
    const prompt = `Create a meditation session within the duration of ${duration} minutes, targeting person with the mood of ${mood}, using a tone of ${tone}. ${extraNotes? "Extra notes: " + extraNotes : ""}`

    try {
        const completions = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 1000
        })

        const session = completions.choices[0].text 
        // console.log("Session \n", session)

        return session
    } catch (error) {
        console.log("Error while generating meditation session from OpenAI API ", error)
        throw Error(error)
    }
}

module.exports = { generatePrompt, generateMeditationSession }

