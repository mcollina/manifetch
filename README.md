# ofetch

An _obvious_ [`fetch()`](https://fetch.spec.whatwg.org/) API client utility.

It is obvious in the sense it uses a staightforward, _**nearly obvious**_ pattern to **automatically build API clients from route definitions in a minimalist manifest**. Write your API code once, automatically get API clients.

## Usage

```js
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

async function main () {
  const { json: posts } = await client.getPosts()
  const { json: post } = await client.getPost({ id: 10 })
  console.log('First post out of collection:', posts[0])
  console.log('Tenth post, individually requested', post)
}

main().then(() => process.exit())
```

## Goals

- [ ] **Work seamlessly** on **Node**, **Deno** and **on the browser**
- [x] Facilitate `fetch()` usage with **minor**, **sensible API enhancements**
- [x] **Automatically** construct API clients based on a **minimalist API manifest**
- [ ] Support both a **minimalist manifest** and the **OpenAPI specification** 

## Status

- [ ] Write comprehensive test suite based on [node-tap](https://node-tap.org/).
- [ ] Write comprehensive usage examples for [`fastify-api`][fa] and [`fastify-vite`][fv]
- [ ] Optimize `applyParams()` implementation with new **fast-apply-params** package
- [ ] Memoize `Proxy` instances on the client, prepopulate all wrappers on the server
- [ ] Use [undici-fetch][uf] as the Node `fetch()` implementation

[fa]: https://github.com/galvez/fastify-api
[fv]: https://github.com/galvez/fastify-vite
[uf]: https://github.com/Ethan-Arrowood/undici-fetch

## License

MIT
