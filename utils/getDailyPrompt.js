const PromptIndex = require('../models/promptIndex')
const promptsConstants = require('../constants/prompts')
const Post = require('../models/posts-model')

const getNewPrompt = async () => {
    const idxObj = await PromptIndex.find()
    
    const idx = idxObj[0].current

    const updateIdx = await PromptIndex.findOneAndUpdate({ current: idx }, { current: (idx + 1) % promptsConstants.length})

    // console.log(updateIdx)
}

module.exports = getNewPrompt