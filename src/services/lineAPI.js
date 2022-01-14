const { clientLine } = require("../configs/line")
const { fullDate } = require("../helpers/date")
const { getUserProfile } = require("../helpers/fetchLineProfile")
const database = require("./database")

const handleEvent = async (events) => {
  const event = events[0]
  switch (event.type) {
    case "message":
      await handleMessageEvent(event)
      break;
    case "beacon":
      await handleBeacon(event)
      break
    default:
      throw new Error(`At this time the server cannot support "${event.type}" event`)
  }
}

const sendMessage = async (id, text) => {
  await clientLine.pushMessage(id, { type: "text", text: text })
}

const handleMessageEvent = async (event) => {
  if (event.source.type == "user" && event.message.type == "text") {
    await sendMessage(event.source.userId, event.message.text)
  } else {
    throw new Error(`At this time the server cannot support "${event.message.type}" with "${event.source.type}" event`)
  }
}

const handleBeacon = async (event) => {
  const date = fullDate(Date.now())
  const todayUserDBData = await database.getByDocument(date, event.source.userId)

  const user = await getUserProfile(event.source.userId)
  const sendTo = process.env.GROUP_ID || event.source.userId
  const messageToSend = `${user.displayName} ได้เข้ามา Office แล้ว`

  if (!todayUserDBData) {
    await database.createDocument(date, event.source.userId)
    await sendMessage(sendTo, messageToSend)
  }
}

module.exports = handleEvent