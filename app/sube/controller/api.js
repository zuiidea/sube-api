exports.platform = {
  ':platform': {
    articles: async function () {
      if (this.params.platform === 'sspai') {
        await this.proxy('https://sspai.com/api/v1/articles')
      } else {
        await this.proxy('github_api:repos/zuiidea/sube')
      }
    }
  }
}
