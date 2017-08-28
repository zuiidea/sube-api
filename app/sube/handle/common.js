const notFound = {
  error: 404,
  message: 'not found'
}

const platformNotfond = Object.assign(notFound,{
  message:'platform not found'
})

const articleNotfond = Object.assign(notFound,{
  message:'article not found'
})


module.exports = {
  notFound,
  platformNotfond,
  articleNotfond
}
