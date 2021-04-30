const ofetch = require('./index')

const manifest = {
  getPosts: ['GET', '/posts'],
  getPost: ['GET', '/posts/:id'],
  nestedDemonstration: {
    getPosts: ['GET', '/posts'],
    getPost: ['GET', '/posts/:id'],  
  },
}

const get = ofetch({
  prefixUrl: 'https://jsonplaceholder.typicode.com',
})

const client = new Proxy(manifest, { get })

async function main () {
  const { json: posts } = await client.getPosts()
  const { json: post } = await client.getPost(1)
  console.log('posts', posts)
  console.log('post', post)
}

main()
