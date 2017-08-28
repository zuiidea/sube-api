const puppeteer = require('puppeteer')
const qs = require('qs')
const { articleNotfond } = require('./common')

const handleList = async function (self) {
  const start = Date.now()
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://m.wufazhuce.com/article')
  const token = await page.evaluate(() => {
    return Promise.resolve(window.One.token)
  })
  const response = await page.goto('http://m.wufazhuce.com/article/ajaxlist/0?_token=' + token)
  const data = await response.json()
  browser.close()

  self.body = {
    total: 10,
    list: data.data.map(item => ({id: item.item_id, summary: item.forward, title: item.title, banner: item.img_url}))
  }
}

const handleDetail = async function (self) {
  await self.proxy('http://v3.wufazhuce.com:8000/api/essay/' + self.params.id)
  const result = self.body
  if(result.res === 0){
    const data = result.data
    self.body = {
      id: data.content_id,
      body: data.hp_content,
      title: data.hp_title,
      createTime: new Date(data.last_update_date).getTime()
    }
  } else {
    self.body = articleNotfond
  }
}

module.exports = {
  handleList,
  handleDetail
}
