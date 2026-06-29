const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");
const auth = require("../middleware/auth");
const manager = require("../middleware/manager");


router.get(
    "/leaves",
    auth,
    manager,
    managerController.getAllLeaves
);
router.put(
    "/leaves/:id",
    auth,
    manager,
    managerController.approveLeave
);
module.exports = router;