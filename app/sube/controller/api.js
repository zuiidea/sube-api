exports.index = async function() {
  await this.proxy('github_api:repos/zuiidea/sube')
}
