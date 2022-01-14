const express = require('express')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
  console.log(`The server running on port ${PORT}`)
})

app.get("/health", (req, res) => {
  return res.send({ msg: "The server is healthy" })
})

app.use("/webhook", require("./controllers/webhook"))