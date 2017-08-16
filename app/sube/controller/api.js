exports.platform = {
  ':platform': {
    articles: async function() {
      if (this.params.platform === 'sspai') {
        await this.proxy('sspai_api:articles')
        const data = this.body
        if (!data.error) {
          this.body = {
            total: data.total,
            list: data.list.map(item => ({
              id: item.id,
              summary: item.summary,
              title: item.title,
              banner: item.banner ? `https://cdn.sspai.com/${item.banner}?imageMogr2/quality/95/thumbnail/!360x220r/gravity/Center/crop/360x260` : '',
            })),
          }
        }
      } else {
        this.body = {
          error: 404,
          message: 'platform not found'
        }
      }
    },
    'article/:id': async function() {
      if (this.params.platform === 'sspai') {
        await this.proxy('sspai_api:articles/' + this.params.id)
        const data = this.body
        if (!data.error) {
          this.body = {
            id: data.id,
            body: data.body,
            title: data.title,
            createTime: data.created_at
          }
        }
      } else {
        this.body = {
          error: 404,
          message: 'platform not found'
        }
      }
    }
  }
}
