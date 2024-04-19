import OpenAI from 'openai'
import * as agents from '~/agents'

const { openai: openaiConfig } = useRuntimeConfig()

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const agent = body.agent || 'customerSupportAgent'

  if (!Object.keys(agents).includes(agent)) {
    throw new Error(`Agent ${agent} not found`)
  }

  const openai = new OpenAI({
    apiKey: openaiConfig.OPENAI_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: body.messages || [],
    temperature: body.temperature || 1,
    // @ts-expect-error already checked above
    ...agents[agent](body),
  })

  return completion
})
