const line = require('@line/bot-sdk')

const config = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret
}

const middleware = line.middleware(config)
const clientLine = new line.Client(config)

module.exports = { middleware, clientLine }