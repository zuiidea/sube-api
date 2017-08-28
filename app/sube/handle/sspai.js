const { articleNotfond } = require('./common')

const handleList = async function (self) {
  await self.proxy('https://sspai.com/api/v1/articles')
  const data = self.body
  if (!data.error) {
    self.body = {
      total: data.total,
      list: data.list.map(item => ({
        id: item.id,
        summary: item.summary,
        title: item.title,
        banner: item.banner
          ? `https://cdn.sspai.com/${item.banner}`
          : ''
      }))
    }
  }
}

const handleDetail = async function (self) {
  await self.proxy('https://sspai.com/api/v1/articles/' + self.params.id)
  const data = self.body
  if (!data.error) {
    self.body = {
      id: data.id,
      body: data.body,
      title: data.title,
      createTime: data.created_at
    }
  } else {
    self.body = articleNotfond
  }
}

module.exports = {
  handleList,
  handleDetail
}
