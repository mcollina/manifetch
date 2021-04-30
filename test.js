'use strict'

const tap = require('tap')
const main = require('./example')

const firstPost = {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\n' +
    'suscipit recusandae consequuntur expedita et cum\n' +
    'reprehenderit molestiae ut ut quas totam\n' +
    'nostrum rerum est autem sunt rem eveniet architecto'
}

const tenthPost = {
  userId: 1,
  id: 10,
  title: 'optio molestias id quia eum',
  body: 'quo et expedita modi cum officia vel magni\n' +
    'doloribus qui repudiandae\n' +
    'vero nisi sit\n' +
    'quos veniam quod sed accusamus veritatis error'
}

tap.test('ofetch', async (t) => {
  t.plan(2)

  const { client, posts, post } = await main(true)
  const { json: postsFromNested } = await client.nestedDemonstration.getPosts()
  const { json: postFromNested } = await client.nestedDemonstration.getPost({ id: 10 })

  t.test('should work without params', (t) => {
    t.plan(2)
    t.strictSame(posts[0], firstPost)
    t.strictSame(postsFromNested[0], firstPost)
  })

  t.test('should work with params', (t) => {
    t.plan(2)
    t.strictSame(post, tenthPost)
    t.strictSame(postFromNested, tenthPost)
  })
})
