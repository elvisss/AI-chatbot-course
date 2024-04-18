import OpenAI from 'openai'

const { openai: openaiConfig } = useRuntimeConfig()

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  console.log('body', body)

  const openai = new OpenAI({
    apiKey: openaiConfig.OPENAI_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: body.messages || [],
    temperature: body.temperature || 1,
  })

  return completion
})
