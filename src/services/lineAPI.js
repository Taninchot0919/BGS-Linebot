const { clientLine } = require("../configs/line")
const { fullDate } = require("../helpers/date")
const { getProfile } = require("../helpers/fetchLineProfile")
const database = require("./database")

const handleEvent = async (events) => {
  const event = events[0]
  console.log(event)
  switch (event.type) {
    case "message":
      if (event.source.type == "user") {
        await sendMessage(event.source.userId, event.message.text)
      }
      break;
    case "beacon":
      await handleBeacon(event)
      break
  }
}

const sendMessage = async (id, text) => {
  clientLine.pushMessage(id, { type: "text", text: text })
}

const handleBeacon = async (event) => {
  const date = fullDate(Date.now())
  const data = await database.getByDocument(date, event.source.userId)
  const lineName = await getProfile(event.source.userId)
  const sendTo = process.env.GROUP_ID || event.source.userId

  if (!data) {
    await database.createDocument(date, event.source.userId)
    await sendMessage(sendTo, `${lineName} ได้เข้ามา Office แล้ว`)
  }
}

module.exports = handleEvent