module.exports = {
  isEmptyObject: (data) => {
    for (const key in data) {
      if (data?.[key]) {
        return false
      }
    }
    return true
  },
  flatProperties: (model) => {
    const traverse = (source, props, dest) => {
      for (const key in source) {
        if (source[key].type === 'object') {
          const query = {}
          traverse(source[key].properties, query, props)
          dest[key] = { ...query }
        } else if (source[key].type === 'array') {
          const query = {}
          traverse(source[key].items.properties, query, props)
          dest[key] = { ...query }
        } else {
          props[key] = ''
          dest[key] = ''
        }
      }
    }

    const properties = {}
    traverse(model, {}, properties)
    return properties
  },
  otpGenerator: () => {
    const r = Math.random();
    const otp = Math.round(r * 9000 + 1000);
    return otp;
  },
}
