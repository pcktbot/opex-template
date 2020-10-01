const subscriptionName = 'YOUR_SUBSCRIPTION_NAME'
const timeout = 60

const { PubSub } = require('@google-cloud/pubsub')

const pubSubClient = new PubSub()

function listenForMessages() {
  const subscription = pubSubClient.subscription(subscriptionName)
  let messageCount = 0
  const messageHandler = (message) => {
    console.log(`Received message ${message.id}:`)
    console.log(`\tData: ${message.data}`)
    console.log(`\tAttributes: ${message.attributes}`)
    messageCount += 1

    message.ack()
  }

  subscription.on('message', messageHandler)

  setTimeout(() => {
    subscription.removeListener('message', messageHandler)
    console.log(`${messageCount} message(s) received.`)
  }, timeout * 1000)
}

listenForMessages()
