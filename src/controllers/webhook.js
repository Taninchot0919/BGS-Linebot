const router = require("express").Router()
const { middleware } = require("../configs/line")
const lineAPI = require("../services/lineAPI")

router.post("/", middleware, async (req, res) => {
  if (req.body.events.length > 0) {
    await lineAPI(req.body.events)
  }
  return res.send(200)
})

module.exports = router