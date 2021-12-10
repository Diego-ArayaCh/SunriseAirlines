const AvionModel = require("../models/Avion");

module.exports.get = async (req, res, next) => {
    const aviones = await AvionModel.find().exec();
    res.json(aviones);
  };
  
  module.exports.getById = async (req, res, next) => {
    const id = req.params.id;
    const avion = await AvionModel.findById(id).exec();
    res.json(avion);
  };
  
  module.exports.create = (req, res, next) => {
    const { modelo, anho, marca, cant_pasa, cant_filas, cant_af, imagen, estado} = req.body;
    const Avion = new AvionModel({ modelo, anho, marca, cant_pasa, cant_filas, cant_af, imagen, estado});
    Avion.save();
    res.json(Avion);
  };
  
  module.exports.delete = async (req, res, next) => {
    const Avion = await AvionModel.findByIdAndRemove(req.params.id);
    // si avion es null significa que no existe el registro
    if (Avion) {
      res.json({ result: `Avion borrado correctamente`, post: Avion });
    } else {
      res.json({ result: "Id de Avion Invalido Invalid", post: Avion });
    }
  };
  
  module.exports.update = async (req, res, next) => {
    const { modelo, anho, marca, cant_pasa, cant_filas, cant_af, imagen, estado } = req.body;
    const Avion = await AvionModel.findOneAndUpdate(
      { _id: req.params.id },
      {modelo, anho, marca, cant_pasa, cant_filas, cant_af, imagen, estado }, // ==> {title: title, body: body}
      { new: true } // retornar el registro que hemos modificado con los nuevos valores
    );
    res.json(Avion);
  };
  module.exports.updateState = async (req, res, next) => {
    const {estado} = req.body;
    const avion = await AvionModel.findOneAndUpdate(
      { _id: req.params.id },
      {estado}, // ==> {title: title, body: body}
      { new: true } // retornar el registro que hemos modificado con los nuevos valores
    );
    res.json(avion);
  };