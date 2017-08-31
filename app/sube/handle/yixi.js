const {articleNotfond} = require('./common')
const axios = require('axios')

const fetchList = (data) => new Promise((resolve, reject) => {
  axios({url: 'http://api.yixi.tv/api/v1/album', data, method: 'get'}).then(response => {
    resolve(response.data)
  }).catch(error => {
    reject()
  })
})

const fetchDetail = (id) => new Promise((resolve, reject) => {
  axios({
    url: 'http://api.yixi.tv/api/v1/lecture/detail/' + id,
    method: 'get'
  }).then(response => {
    resolve(response.data)
  }).catch(error => {
    reject()
  })
})

const handleList = async function (self) {
  const result = await fetchList(self.params)

  self.body = {
    total: 100,
    list: result.data.map(item => ({
      id: item.id,
      summary: item.desc,
      title: item.title,
      banner: item.lectures[0]
        ? item.lectures[0].cover
        : '',
      video: item.lectures[0]
        ? 'http://v.youku.com/v_show/id_' + item.lectures[0].video + '==.html'
        : '',
      videoType: 'youku'
    }))
  }
}

const handleDetail = async function (self) {
  const result = await fetchDetail(self.params.id)
  if (result.res === 0) {
    const {data} = result
    self.body = result
    self.body = {
      id: data.id,
      body: data.purecontent,
      title: data.result,
      createTime: new Date(data.time).getTime(),
      video: 'http://v.youku.com/v_show/id_' + data.video + '==.html',
      videoType: 'youku'
    }
  } else {
    self.body = articleNotfond
  }
}

module.exports = {
  handleList,
  handleDetail
}
