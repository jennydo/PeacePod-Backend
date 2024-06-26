const OpenAI = require("openai");
const Prompt = require("../../models/prompt-model");
const dotenv = require("dotenv");
const env = dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/// Generate a new prompt daily
const generatePrompt = async () => {
  // const prompt = await openai.chat.completions.create({
  //     model: "gpt-4-turbo",
  //     messages: [
  //         { "role": "user", "content": "Give me a short writing prompt for people with mental health issues. Keep it in one sentence only and within 30 tokens. The prompt could be in form of questions or sentences or fictions" }
  //     ],
  //     max_tokens: 30,
  //     temperature: 0.8 /// [0, 2] higher -> more random
  // });

  const prompt = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "user",
        content: `Give me a short writing prompt for the purpose of meditating in unfinished sentence so that user can fill up themselves. Given the user has mental health issues.
            examples: I love it when you...
            If you know me, you would know that...`,
      },
    ],
    max_tokens: 30,
    temperature: 1.2, /// [0, 2] higher -> more random
  });

  const promptContent = prompt.choices[0].message.content;

  // /// For debuggin only
  // const allPrompts = await Prompt.find()
  // if (allPrompts)
  // {
  //   const oldPrompt = allPrompts[allPrompts.length - 1]
  //   console.log("Old prompt", oldPrompt.content)
  // }

  let newPrompt;
  /// Create a new prompt in DB
  newPrompt = await Prompt.create({ content: promptContent });
  console.log("new prompt ", newPrompt.content);

  return newPrompt
};

/// Generate meditation session
const generateMeditationSession = async (requirements) => {
  const { duration, mood, tone, extraNotes } = requirements;
  const prompt = `Create a meditation session within the duration of ${duration} minutes, targeting person with the mood of ${mood}, using a tone of ${tone}. ${
    extraNotes ? "Extra notes: " + extraNotes : ""
  }. Just give me the content of the scripts without any instruction like **Introduction**.`;

  try {
    const completions = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 1000,
    });

    const session = completions.choices[0].message.content;
    // console.log("Session \n", session)

    return session;
  } catch (error) {
    console.log(
      "Error while generating meditation session from OpenAI API ",
      error
    );
    throw Error(error);
  }
};

module.exports = { generatePrompt, generateMeditationSession };
