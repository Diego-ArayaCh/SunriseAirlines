const express = require("express");
const router = express.Router();
const vueloController = require("../controllers/vueloController");

//Autenticación para el uso del API
const auth = require("../middleware/auth");
const { permit } = require("../middleware/authorization");

//Definición de rutas para cada uno de los verbos para los post
router.get("/get-flight", vueloController.get);

router.get("/get-flight-aux", vueloController.getSencillo);

router.get("/getBy-flight/:id", vueloController.getById);

router.get("/getBy-flight-aux/:id", vueloController.getById_Sencillo);

router.post("/add-flight",  vueloController.create);

router.delete("/delete-flight/:id", vueloController.delete);

router.put("/update-flight-state/:id",vueloController.updateState);

router.put("/update-flight-seat/:id", vueloController.updateSeat);

router.put("/update-flight/:id", vueloController.update);

//router.put("/update-flight/:id",auth, permit(1), vueloController.update);

module.exports = router;
