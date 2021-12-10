const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { permit } = require("../middleware/authorization");
const aeropuertoController = require("../controllers/aeropuertoController");



router.get("/get", aeropuertoController.get);

router.get("/get/:id", aeropuertoController.getById);

router.post("/create/", aeropuertoController.create);

router.delete("/delete/:id", aeropuertoController.delete);

router.put("/update/:id", aeropuertoController.update);

module.exports = router;
