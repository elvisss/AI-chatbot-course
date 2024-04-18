import OpenAI from 'openai'

const { openai: openaiConfig } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const openai = new OpenAI({
    apiKey: openaiConfig.OPENAI_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo',
  })

  return completion
})
