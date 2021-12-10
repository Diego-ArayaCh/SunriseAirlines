const VueloModel = require("../models/Vuelo");
const AvionModel = require("../models/Avion");
const AeropuertoModel = require("../models/Aeropuerto");

module.exports.get = async (req, res, next) => {
  const vuelos = await VueloModel.find().populate("avion_id ruta_id horario_id").exec();

  const vuelosAuxiliar = [];
  for (const vuelo of vuelos) {
    const inicio = await AeropuertoModel.findById(vuelo.ruta_id.inicio).exec();
    const destino = await AeropuertoModel.findById(vuelo.ruta_id.destino).exec();

    vuelo.ruta_id.inicio = inicio;
    vuelo.ruta_id.destino = destino;

    vuelosAuxiliar.push(vuelo);
  }

  res.json(vuelosAuxiliar);
};

module.exports.getSencillo = async (req, res, next) => {
  const vuelos = await VueloModel.find().populate("avion_id ruta_id horario_id").exec();
  res.json(vuelos);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const vuelo = await VueloModel.findOne({ _id: id }).populate("avion_id ruta_id horario_id").exec();

  const inicio = await AeropuertoModel.findById(vuelo.ruta_id.inicio).exec();
  const destino = await AeropuertoModel.findById(vuelo.ruta_id.destino).exec();

  vuelo.ruta_id.inicio = inicio;
  vuelo.ruta_id.destino = destino;

  res.json(vuelo);
};

module.exports.getById_Sencillo = async (req, res, next) => {
  const id = req.params.id;
  const vuelo = await VueloModel.findOne({ _id: id }).populate("avion_id ruta_id horario_id").exec();
  res.json(vuelo);
};

module.exports.create = async (req, res, next) => {
  const { avion_id, ruta_id, horario_id, hora_lleg } = req.body;

  const estado = 1;

  const avion = await AvionModel.findById(avion_id).exec();
  const cantFilas = avion.cant_filas;
  const cantAsFil = avion.cant_af;
  let arrAsientos_Con_Filas = [];
  for (let i = 1; i <= cantFilas; i++) {
    for (let j = 1; j <= cantAsFil; j++) {
      let asiento = {
        "fil": i,
        "num": j,
        "est": false
      }
      arrAsientos_Con_Filas.push(asiento);
    }
  }

  const vuelo = await new VueloModel({ avion_id: avion_id, ruta_id: ruta_id, horario_id: horario_id, hora_lleg: hora_lleg, asientos: arrAsientos_Con_Filas, estado: estado });
  vuelo.save();
  res.json(vuelo);
};

module.exports.delete = async (req, res, next) => {
  const vuelo = await VueloModel.findByIdAndRemove(req.params.id);
  // si vuelo es null significa que no existe el registro
  if (vuelo) {
    res.json({ result: "Flight deleted", vuelo });
  } else {
    res.json({ result: "Invalid Id", vuelo });
  }
};

module.exports.updateState = async (req, res, next) => {
  const { estado } = req.body;

  const vuelo = await VueloModel.findOneAndUpdate(
    { _id: req.params.id },
    { estado },
    { new: true }
  );
  res.json(vuelo);
};

module.exports.updateSeat = async (req, res, next) => {
  const { num_fila, num_asiento } = req.body;

  const vuelo_Original = await VueloModel.findById(req.params.id).exec();
  const asientos = vuelo_Original.asientos;
  for (let i = 0; i < asientos.length; i++) {
    if (asientos[i].fil === num_fila && asientos[i].num === num_asiento) {
      asientos[i].est = true;
    }
  }

  const vuelo = await VueloModel.findOneAndUpdate(
    { _id: req.params.id },
    { asientos },
    { new: true }
  );
  res.json(vuelo);
};

module.exports.update = async (req, res, next) => {
  const { avion_id, ruta_id, horario_id, hora_lleg, num_fila, num_asiento } = req.body;

  const vuelo_Original = await VueloModel.findById(req.params.id).exec();
  const asientos = vuelo_Original.asientos;
  for (let i = 0; i < asientos.length; i++) {
    if (asientos[i].fil === num_fila && asientos[i].num === num_asiento) {
      asientos[i].est = true;
    }
  }

  const vuelo = await VueloModel.findOneAndUpdate(
    { _id: req.params.id },
    { avion_id, ruta_id, horario_id, hora_lleg, asientos },
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(vuelo);
};
