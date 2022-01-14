const router = require("express").Router()
const { middleware } = require("../configs/line")
const lineAPI = require("../services/lineAPI")

router.post("/", middleware, async (req, res) => {
  await lineAPI(req.body.events)
})

module.exports = router