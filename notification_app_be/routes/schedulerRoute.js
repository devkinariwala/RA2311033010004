const express = require("express");
const router = express.Router();
const controller = require("../controller/schedulerController");

router.get("/schedule", controller.getSchedule);

module.exports = router;