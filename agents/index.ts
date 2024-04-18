// register all agent files here
export * from './customerSupportAgent'
export * from './facebookAgent'
export * from './twitterAgent'

// and register types here
export type Agent = 'facebook' | 'twitter' | 'customerSupport'

import type OpenAI from 'openai'

// util function for creating trainings with proper typing
export default function createAgent(
  agent: (context: Record<string, any>) => Partial<OpenAI.Chat.ChatCompletionCreateParamsNonStreaming>
) {
  return agent
}
