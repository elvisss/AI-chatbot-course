import OpenAI from 'openai'
import { customerSupportAgent } from '~/agents'

const { openai: openaiConfig } = useRuntimeConfig()

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const openai = new OpenAI({
    apiKey: openaiConfig.OPENAI_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: body.messages || [],
    temperature: body.temperature || 1,
    ...customerSupportAgent(body),
  })

  return completion
})
