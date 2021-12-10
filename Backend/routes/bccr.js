const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { permit } = require("../middleware/authorization");
const bccrController = require("../controllers/bccrController");



router.get("/get", bccrController.get);


module.exports = router;
