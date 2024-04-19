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
        content: 'You are a prompt enginer for DALL-E',
      },
      {
        role: 'user',
        content: `Provide 4 physical items that represent 4 topics from this article: ${url}`,
      },
    ],
    temperature: body.temperature || 1,
  })

  if (!completion.choices[0].message.content) {
    throw new Error('DALL-E prompt not generated')
  }

  const dallePrompt = completion.choices[0].message.content.trim()

  const { data } = await openai.images.generate({
    prompt:
      'black and white sticker style illustration. stylize the items to be a repeating pattern, white background' +
      dallePrompt,
    n: 1,
    size: '256x256',
  })

  const imageUrl = data[0].url

  if (!imageUrl) {
    throw new Error('No image returned from OpenAI')
  }

  const res: Buffer = await $fetch(imageUrl, {
    responseType: 'arrayBuffer',
  })
  const base64String = Buffer.from(res).toString('base64')

  return `data:image/jpeg;base64,${base64String}`
})
