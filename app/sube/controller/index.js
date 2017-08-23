exports.index = async function () {
  this.body = {
    message: 'api'
  }
}

exports.index.__method__ = 'get'
