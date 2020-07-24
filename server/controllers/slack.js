const axios = require('axios')

module.exports = {
  post(url, data) {
    axios
      .post(url, data)
  }
}
