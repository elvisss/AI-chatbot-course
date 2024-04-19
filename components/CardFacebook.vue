<script setup lang="ts">
const props = defineProps<{
  url: string
  temperature: number
}>()

const { chat, state, firstMessage } = useChatAi({ agent: 'facebook' })

const announcement = computed(() => firstMessage.value?.content || '')
const postURL = computed(() => {
  const url = new URL('https://facebook.com/sharer/sharer.php')
  url.searchParams.set('u', props.url)
  return url.toString()
})

function generate() {
  nextTick(() => {
    chat(props)
  })
}

const { copy } = useClipboard()

function post() {
  copy(announcement.value || '')
  setTimeout(() => {
    window.open(postURL.value, '_blank')
  }, 500)
}

defineExpose({ generate })
</script>

<template>
  <CardGeneric title="Facebook" :state="state" :body="announcement">
    <button class="btn btn-neutral" @click="generate">Regenerate</button>
    <a class="btn btn-primary" :href="postURL" @click.prevent="post">Copy Announcement and Post</a>
  </CardGeneric>
</template>
