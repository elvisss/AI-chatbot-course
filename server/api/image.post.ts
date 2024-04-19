import OpenAI from 'openai'

const { openai: openaiConfig } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const url = body.url

  const openai = new OpenAI({
    apiKey: openaiConfig.OPENAI_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a promt engineer creating DALL-E prompts',
      },
      {
        role: 'user',
        content:
          `Provide 2 realistic physical objects based on this article: ${url}`,
      },
    ],
    temperature: body.temperature || 1,
  })

  if (!completion.choices[0].message.content) {
    throw new Error('No message returned from OpenAI')
  }

  console.log('OpenAI response:', completion)

  return url
})
