const router = require("express").Router()
const { middleware } = require("../configs/line")
const lineAPI = require("../services/lineAPI")

router.post("/", middleware, async (req, res) => {
  try {
    if (req.body.events.length > 0) {
      await lineAPI(req.body.events)
    }
    return res.status(200).send({ msg: "Send Message Success" })
  } catch (error) {
    console.log(error.message)
    return res.status(500).send({ error: error.message })
  }
})

module.exports = router