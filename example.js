const fetch = require('undici-fetch')
const ofetch = require('ofetch')

const prefix = 'https://jsonplaceholder.typicode.com'
const get = ofetch({ fetch, prefix })

const manifest = {
  getPosts: ['GET', '/posts'],
  getPost: ['GET', '/posts/:id'],
  nestedDemonstration: {
    getPosts: ['GET', '/posts'],
    getPost: ['GET', '/posts/:id'],
  },
}

const client = new Proxy(manifest, { get })

async function main (test = false) {
  const { json: posts } = await client.getPosts()
  const { json: post } = await client.getPost({ id: 10 })
  if (!test) {
    console.log('First post out of collection:', posts[0])
    console.log('Tenth post, individually requested', post)
  }
  return { posts, post }
}

module.exports = main

if (require.main === module) {
  main().then(() => process.exit())
}
