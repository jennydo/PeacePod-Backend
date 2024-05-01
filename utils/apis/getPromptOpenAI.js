const OpenAI = require('openai')

const openai = new OpenAI()
const generatePrompt = async () => {
    
    const prompt = await openai.chat.completions.create({
        messages: [
            { role: 'user', content: "Give me a short writing prompt for people with mental health issues. Keep it in one sentence only."}
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 30,
      });
    
      console.log(prompt.choices[0].message.content);
}

module.exports = { generatePrompt }

