const axios = require('axios')
const slackApi = require('../../../server/controllers/slack')
const { SLACK_FEEDBACK_URL: url } = process.env
jest.mock('axios')
describe('Slack', () => {
  test('Creating Post', async () => {
    const data = { status: 200 }
    axios.post.mockImplementationOnce(() => Promise.resolve(data))
    const reqData = {
      text: 'Test Bot says: Stuff\n File Under: Testing',
      username: 'CRS',
      icon_emoji: ':octopus:'
    }
    await slackApi.post(url, reqData)

    expect(axios.post).toHaveBeenCalledWith(url, reqData)
  })
})
