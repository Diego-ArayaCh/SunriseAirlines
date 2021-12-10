const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { permit } = require("../middleware/authorization");
const reservaController = require("../controllers/reservaController");



router.get("/get", reservaController.get);

router.get("/get/:id", reservaController.getById);

router.get("/getCheck/:id", reservaController.getCheckIn);

router.post("/create/", reservaController.create);

router.delete("/delete/:id", reservaController.delete);

router.put("/update/:id", reservaController.update);

router.put("/checkIn/:id", reservaController.checkIn);

module.exports = router;
