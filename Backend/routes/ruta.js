const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { permit } = require("../middleware/authorization");
const rutaController = require("../controllers/rutaController");
const horarioController = require("../controllers/horarioController");


router.get("/", rutaController.get);

router.get("/:id", rutaController.getById);

router.post("/create/", rutaController.create);

router.delete("/delete/:id",horarioController.delete, rutaController.delete);

// actualizar registro
router.put("/update/:id",horarioController.delete,horarioController.update, rutaController.update);


router.put("/update-route-state/:id", rutaController.updateState);

module.exports = router;
