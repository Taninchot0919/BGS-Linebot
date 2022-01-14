const axios = require("axios").default

const config = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret
}

const getProfile = async (userId) => {
  const user = await axios.get(`https://api.line.me/v2/bot/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${config.channelAccessToken}`
    }
  })
  return user.data.displayName
}

module.exports = { getProfile }