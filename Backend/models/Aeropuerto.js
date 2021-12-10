const mongoose = require('mongoose');

const Aeropuerto = mongoose.model(
    "Aeropuerto", 
    new mongoose.Schema({
        nombre:String,
        pais:String,
        ciudad:String,
        latitud:Number,
        longitud:Number,
        descripcion:String,
        estado:Number
    })
);

module.exports = Aeropuerto;

