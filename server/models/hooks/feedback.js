const slackApi = require('../../controllers/slack')
const { SLACK_FEEDBACK_URL: url } = process.env
module.exports = (models) => {
  models.feedback.addHook('afterCreate', (instance, options) => {
    const { name, comments, type } = instance.dataValues
    return slackApi.post(url, {
      text: `${name} says: ${comments}\n File Under: ${type}`,
      username: 'CRS',
      icon_emoji: ':octopus:'
    })
  })
}
