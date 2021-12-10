const HorarioModel = require("../models/Horario");
const RutaModel = require("../models/Ruta");
module.exports.get = async (req, res, next) => {
  const horarios = await HorarioModel.find().populate("Horario", "fecha hora_sal").exec();
  res.json(horarios);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const horario = await HorarioModel.findOne({
    _id: id
  }).exec();
  res.json(horario);
};

module.exports.create = (req, res, next) => {
  const {
    fecha,
    hora_sal
  } = req.body;
  const horario = new HorarioModel({
    fecha: fecha,
    hora_sal: hora_sal
  });
  horario.save();
  res.json(horario);
};

module.exports.delete = async (req, res, next) => {
  console.log("entra delete")


  var {
    horarios
  } = await RutaModel.findById(req.params.id).populate("horarios").exec();
  var horariosAux = [];

  for (const horario of req.body.horarios) {
    console.log
    if (!horario.inUse) {
      if (horario._id != null) {
        var horarioDB = await HorarioModel.findByIdAndRemove(horario._id);
        console.log("NOTinUse")
      }

    }
    if (horario.inUse) {
      horariosAux.push(horario._id)
      console.log("inUse")
    }




  }




  req.horarios_id = horariosAux;





  // si post es null significa que no existe el registro
  return next();

};

module.exports.update = async (req, res, next) => {

  //borrar




  //crear
  var horarios_id = [];
  console.log(req.horarios_id)

  console.log(req.body.horarios)
  for (const element of req.body.horarios) {

    if (!element.inUse) {
      const {
        fecha,
        hora_sal
      } = element;
     
      const horario = await new HorarioModel({
        fecha,
        hora_sal
      });
      await horario.save();
      req.horarios_id.push(horario._id);
    }



  }


  





  return next();
};