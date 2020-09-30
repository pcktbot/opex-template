const { REDIS_URL } = process.env
const path = require('path')
const fs = require('fs')
const Bull = require('bull')
const queues = []
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'README.md') // get all the model files
  .forEach((file) => {
    const queue = require(path.join(__dirname, file))
    const fileName = file.replace('.js', '')
    module.exports[fileName] = queue(Bull, REDIS_URL)
  })

module.exports = {
  ...queues
}
