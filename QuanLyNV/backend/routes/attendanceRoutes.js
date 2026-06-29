const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const auth = require("../middleware/auth");

router.post("/checkin", auth, attendanceController.checkIn);
router.put("/checkout", auth, attendanceController.checkOut);
router.get("/history", auth, attendanceController.getHistory);
module.exports = router;