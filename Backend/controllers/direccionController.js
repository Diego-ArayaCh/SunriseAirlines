const DireccionModel = require("../models/Direccion");

module.exports.get = async (req, res, next) => {
  const direcciones = await DireccionModel.find().populate("Direccion", "sennas latitud longitud").exec();
  res.json(direcciones);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const direccion = await DireccionModel.findOne({ _id: id }).exec();
  res.json(direccion);
};

module.exports.create = (req, res, next) => {
  const { sennas, latitud, longitud } = req.body;
  const direccion = new DireccionModel({ sennas: sennas, latitud: latitud, longitud: longitud });
  direccion.save();
  res.json(direccion);
};

module.exports.delete = async (req, res, next) => {
  const direccion = await DireccionModel.findByIdAndRemove(req.params.id);
  // si post es null significa que no existe el registro
  if (direccion) {
    res.json({ result: "Address deleted", direccion });
  } else {
    res.json({ result: "Invalid Id", direccion });
  }
};

module.exports.update = async (req, res, next) => {
  const { sennas, latitud, longitud } = req.body;
  const direccion = await DireccionModel.findOneAndUpdate(
    { _id: req.params.id },
    { sennas, latitud, longitud },
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(direccion);
};