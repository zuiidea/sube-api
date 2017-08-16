exports.index = async function () {
  await this.bindDefault()

  await this.render('home', {
    title: 'api'
  })
}
