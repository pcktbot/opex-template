module.exports = (Bull, redisUrl) => {
  return new Bull('salesforce', redisUrl)
}
