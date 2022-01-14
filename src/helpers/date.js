const dayjs = require("dayjs")

const fullDate = (ms) => {
  return dayjs(ms).format("YYYY-MM-DD")
}

module.exports = { fullDate }