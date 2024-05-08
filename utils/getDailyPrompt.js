const PromptIndex = require('../models/promptIndex')
const promptsConstants = require('../constants/prompts')
const Post = require('../models/posts-model')

const getNewPrompt = async () => {
    /// Make old prompt normal post. Do it here so that on every API calls 
    /// from Frontend there will be no changes and no unnecessary new prompt is created
    const oldPrompt = await Post.findOne({ isPrompt: true })
    if (oldPrompt)
    {
        await Post.findOneAndUpdate({ isPrompt: true }, { isPrompt: false }, { new: true })
    }

    /// Update the current index
    const idxObj = await PromptIndex.find()
    const idx = idxObj[0].current
    const updateIdx = await PromptIndex.findOneAndUpdate({ current: idx }, { current: (idx + 1) % promptsConstants.length})
    
    /// Get the new prompt content with the updatedIndex and create a new prompt in DB
    const promptContent = promptsConstants[idx + 1]
    const userId = "661f3d5f7bc0dc0597752679"
    const newPrompt = await Post.create({ userId, title: "Prompt of the day", content: promptContent, isPrompt: true })
    
    console.log("old prompt ", oldPrompt, " \nnew prompt ", newPrompt)
}

module.exports = getNewPrompt