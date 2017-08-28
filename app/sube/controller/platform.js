const one = require('../handle/one')
const sspai = require('../handle/sspai')
const { platformNotfond } = require('../handle/common')

exports[':platform'] = {
  articles: async function () {
    const platform = this.params.platform
    if (platform === 'sspai') {
      await sspai.handleList(this)
    } else if (platform === 'one') {
      await one.handleList(this)
    } else {
      this.body = platformNotfond
    }
  },
  'article/:id': async function () {
    const platform = this.params.platform
    if (platform === 'sspai') {
      await sspai.handleDetail(this)
    } else if (platform === 'one') {
      await one.handleDetail(this)
    } else {
      this.body = platformNotfond
    }
  }
}

exports[':platform'].articles.__method__ = 'get'
exports[':platform']['article/:id'].__method__ = 'get'
