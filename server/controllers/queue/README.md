TEMPLATE

module.exports = (Bull, redisUrl){
  const queue = new Bull('queueName', redisUrl)
}