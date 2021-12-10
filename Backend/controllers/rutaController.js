const RutaModel = require("../models/Ruta");
const HorarioModel = require("../models/Horario");
const AeropuertoModel = require("../models/Aeropuerto");

module.exports.get = async (req, res, next) => {
  var ruta = await RutaModel.find().populate("horarios").populate("inicio").populate("destino").exec();
  

  res.json(ruta);
};

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const ruta = await RutaModel.findById(id).populate("horarios").populate("inicio").populate("destino").exec();
  res.json(ruta);
};

module.exports.create = async (req, res, next) =>  {
  var {inicio, destino, horarios, lon_in, lat_in, lon_fin, lat_fin, duracion, precio_trayecto, descuento} = req.body;


 

var horarios_id=[];
console.log(horarios);
await horarios.forEach(element => {
  const { fecha, hora_sal } = element;
  const horario =  new HorarioModel({ 
    fecha, hora_sal });
  horario.save();
    horarios_id.push(horario._id);
});

horarios = horarios_id;



//se envían los aeropuertos sólo el _id sin el objeto

  const ruta = new RutaModel({ inicio:inicio, destino:destino, horarios:horarios, lon_in:lon_in, lat_in:lat_in, lon_fin:lon_fin, lat_fin:lat_fin, duracion:duracion, precio_trayecto:precio_trayecto, descuento:descuento, estado:1});
  ruta.save();
  res.json(ruta);

 
};

module.exports.delete = async (req, res, next) => {


var ruta = await RutaModel.findById(req.params.id);

 
   ruta = await RutaModel.findByIdAndRemove(req.params.id);
   
  // si post es null significa que no existe el registro
  if (ruta) {
    res.json({ result: `Post borrado correctamente`, post: ruta });
  } else {
    res.json({ result: "Id de Post Invalido Invalid", post: ruta });
  }
};

module.exports.update = async (req, res, next) => {








  var {inicio, destino, horarios, lon_in, lat_in, lon_fin, lat_fin, duracion, precio_trayecto, descuento, estado} = req.body;
   const ruta = await RutaModel.findOneAndUpdate(
      { _id: req.params.id },
      {inicio:inicio, destino:destino, horarios:req.horarios_id, lon_in:lon_in, lat_in:lat_in, lon_fin:lon_fin, lat_fin:lat_fin, duracion:duracion, precio_trayecto:precio_trayecto, descuento:descuento, estado:estado}, // ==> {title: title, body: body}
      { new: true } // retornar el registro que hemos modificado con los nuevos valores
    );

    console.log(req.horarios_id)

// const aRutas = await RutaModel.find().populate("horarios").excec()

// const aHorarios = await HorarioModel.find();
// var depende = false;
// for (const horario of aHorarios) {
//   for (const ruta of aRutas) {
    
//     if (!depende) {
//       depende = ruta.horarios.includes(horario)
//     }
   
 
//   }

//   if (!depende) {
//     //se realiza el borrado del horario que no tiene relación con rutas
//     var horarioDB = await HorarioModel.findByIdAndRemove(horario._id);
//   }
  
  // }






    
    res.json(ruta);
};


module.exports.updateState = async (req, res, next) => {
  const {estado } = req.body;
  const user = await RutaModel.findOneAndUpdate(
    { _id: req.params.id },
    {estado}, // ==> {title: title, body: body}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(user);
};