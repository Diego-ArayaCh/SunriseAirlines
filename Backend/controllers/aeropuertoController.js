const AeropuertoModel = require("../models/Aeropuerto");

module.exports.get = async (req, res, next) => {
    const aeropuertos = await AeropuertoModel.find().exec();
    res.json(aeropuertos);
  };
  
  module.exports.getById = async (req, res, next) => {
    const id = req.params.id;
    const aeropuerto = await AeropuertoModel.findById(id).exec();
    res.json(aeropuerto);
  };
  
  module.exports.create = (req, res, next) => {
    const { nombre, pais, ciudad, latitud, longitud, descripcion, estado} = req.body;
    const aeropuerto = new AeropuertoModel({ nombre, pais, ciudad, latitud, longitud, descripcion, estado });
    aeropuerto.save();
    res.json(aeropuerto);
  };
  
  module.exports.delete = async (req, res, next) => {
    const aeropuerto = await AeropuertoModel.findByIdAndRemove(req.params.id);
    // si aeropuerto es null significa que no existe el registro
    if (aeropuerto) {
      res.json({ result: `aeropuerto borrado correctamente`, post: aeropuerto });
    } else {
      res.json({ result: "Id de aeropuerto Invalido Invalid", post: aeropuerto });
    }
  };
  
  module.exports.update = async (req, res, next) => {
    const { nombre, pais, ciudad, latitud, longitud, descripcion, estado } = req.body;
    const aeropuerto = await AeropuertoModel.findOneAndUpdate(
      { _id: req.params.id },
      {nombre, pais, ciudad, latitud, longitud, descripcion, estado }, // ==> {title: title, body: body}
      { new: true } // retornar el registro que hemos modificado con los nuevos valores
    );
    res.json(aeropuerto);
  };