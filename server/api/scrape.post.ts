function getH1FromHtmlString(html: string) {
  const match = html.match(/<h1.*?>(.*?)<\/h1>/)
  return match ? match[1] : 'No H1 found'
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const url = body.url

  const html = await $fetch<string>(url)
  const title = getH1FromHtmlString(html)

  return {
    title,
  }
})
