# ofetch

An _obvious_ [`fetch()`](https://fetch.spec.whatwg.org/) wrapper.

It is obvious in the sense it uses a staightforward, _**nearly obvious**_ pattern to **automatically build API clients from route definitions in a minimalist manifesto**. Write your API code once, automatically get API clients.

## Usage

```js
const ofetch = require('ofetch')

const manifesto = {
  getPosts: ['GET', '/posts'],
  getPost: ['GET', '/posts/:id'],
  nestedDemonstration: {
    getPosts: ['GET', '/posts'],
    getPost: ['GET', '/posts/:id'],  
  },
}

const get = ofetch({
  prefixUrl: 'https://jsonplaceholder.typicode.com/',
})

const client = new Proxy(manifest, { get })

async function main () {
  const { json: posts } = await client.getPosts()
  const { json: post } = await client.getPost(1)
  console.log('posts', posts)
  console.log('post', post)
}

main()
```

## Goals

- Facilitate `fetch()` usage with **minor**, **sensible API enhancements**
- **Automatically** construct API clients based on a **minimalist API manifesto**
- **Work seamlessly** on **Node**, **Deno** and **on the browser**
- Support both a **minimalist manifesto** and the **OpenAPI specification** 

## Status

- [ ] Write comprehensive test suite based on [node-tap](https://node-tap.org/).
- [ ] Write comprehensive usage examples for [`fastify-api`][fa] and [`fastify-vite`][fv]
- [ ] Optimize `applyParams()` implementation with new **fast-apply-params** package
- [ ] Memoize `Proxy` instances on the client, prepopulate all wrappers on the server
- [ ] Use [undici-fetch](https://github.com/Ethan-Arrowood/undici-fetch) on Node

[fa]: https://github.com/galvez/fastify-api
[fv]: https://github.com/galvez/fastify-vite

## License

MIT
