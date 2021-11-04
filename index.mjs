function manifetch (instance) {
  return getFetchWrapper.bind(instance)
}

export default manifetch

function getFetchWrapper (methods, method) {
  if (method in methods) {
    if (!Array.isArray(methods[method]) && typeof methods[method] === 'object') {
      return new Proxy(methods[method], { get: getFetchWrapper.bind(this) })
    }
    const [httpMethod, path] = methods[method]
    const hasParams = path.match(/\/:(\w+)/)
    if (hasParams) {
      return async (params, options = {}) => {
        options.method = httpMethod
        // eslint-disable-next-line no-undef
        const response = await this.fetch(`${
          this.prefix
        }${
          applyParams(path, params)
        }`, options)
        const body = await response.text()
        return {
          body,
          json: tryJSONParse(body),
          status: response.status,
          headers: response.headers
        }
      }
    } else {
      return async (options = {}) => {
        options.method = httpMethod
        // eslint-disable-next-line no-undef
        const response = await this.fetch(`${this.prefix}${path}`, options)
        const body = await response.text()
        return {
          body,
          json: tryJSONParse(body),
          status: response.status,
          headers: response.headers
        }
      }
    }
  }
}

function applyParams (template, params) {
  try {
    return template.replace(/:(\w+)/g, (_, m) => {
      if (params[m]) {
        return params[m]
      } else {
        // eslint-disable-next-line no-throw-literal
        throw null
      }
    })
  } catch (err) {
    if (err === null) {
      return err
    } else {
      throw err
    }
  }
}

function tryJSONParse (str) {
  try {
    return JSON.parse(str)
  } catch (_) {
    return undefined
  }
}
