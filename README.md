# manifetch

A simple manifest-based [`fetch()`](https://fetch.spec.whatwg.org/) API client building utility.

It is obvious in the sense it uses a staightforward, _**nearly obvious**_ pattern to **automatically build API clients from route definitions in a minimalist manifest**. Write your API code once, automatically get API clients.

## Install

```
$ npm i manifetch --save
```

## Usage

```js
const fetch = require('undici-fetch')
const manifetch = require('manifetch')

const prefix = 'https://jsonplaceholder.typicode.com'
const get = manifetch({ fetch, prefix })

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

See also [example][example] and [test][test].

[example]: https://github.com/terixjs/manifetch/blob/main/example.js
[test]: https://github.com/terixjs/manifetch/blob/main/test.js

## Goals

- [ ] **Work seamlessly** on **Node**, **Deno** and **on the browser**
- [x] Facilitate `fetch()` usage with **minor**, **sensible API enhancements**
- [x] **Automatically** construct API clients based on a **minimalist API manifest**
- [ ] Support both a **minimalist manifest** and the **OpenAPI specification** 

## Status

- [x] Basic Node implementation using [undici-fetch][uf] for `fetch()`
- [ ] Write comprehensive test suite based on [node-tap](https://node-tap.org/).
- [ ] Write comprehensive usage examples for [`fastify-api`][fa] and [`fastify-vite`][fv]
- [ ] Optimize `applyParams()` implementation with new **fast-apply-params** package
- [ ] Memoize `Proxy` instances on the client, prepopulate all wrappers on the server

[fa]: https://github.com/galvez/fastify-api
[fv]: https://github.com/galvez/fastify-vite
[uf]: https://github.com/Ethan-Arrowood/undici-fetch

## License

MIT
