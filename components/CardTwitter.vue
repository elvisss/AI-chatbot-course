<script setup lang="ts">
const props = defineProps<{
  url: string
  temperature: number
}>()

const { chat, state, firstMessage } = useChatAi({ agent: 'twitter' })

const announcement = computed(() => firstMessage.value?.content || '')
const postURL = computed(() => {
  const url = new URL('https://twitter.com/intent/tweet')
  url.searchParams.set('text', announcement.value)
  return url.toString()
})

function generate() {
  nextTick(() => {
    chat(props)
  })
}

defineExpose({ generate })
</script>
<template>
  <CardGeneric
    title="Twitter"
    :state="state"
    :body="announcement"
  >
    <div class="flex w-full justify-between items-center">
      <div class="text-xs">
        Character count:
        <strong>{{ announcement.length }}</strong>
      </div>
      <div>
        <button class="btn btn-neutral" @click="generate">Regenerate</button>
        <a class="btn btn-primary" target="_blank" :href="postURL">Post</a>
      </div>
    </div>
  </CardGeneric>
</template>
