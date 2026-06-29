const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");
const auth = require("../middleware/auth");


router.post("/", auth, leaveController.createLeave);
router.get("/", auth, leaveController.getLeaves);
router.delete("/:id", auth, leaveController.deleteLeave);

module.exports = router;