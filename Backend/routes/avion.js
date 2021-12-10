const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { permit } = require("../middleware/authorization");
const avionController = require("../controllers/avionController");



router.get("/get", avionController.get);

router.get("/get/:id", avionController.getById);

router.post("/create/", avionController.create);

router.delete("/delete/:id", avionController.delete);

router.put("/update/:id", avionController.update);
router.put('/updateState/:id', avionController.updateState);
module.exports = router;
