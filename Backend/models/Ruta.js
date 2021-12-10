const mongoose = require('mongoose');

const Ruta = mongoose.model(
    "Ruta", 
    new mongoose.Schema({ 
        inicio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aeropuerto'
        },
        destino:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aeropuerto'
        },
        horarios: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Horario',
          }],
          lon_in: {
            type: String,
          },
          lat_in: {
            type: String,
          },
          lon_fin: {
            type: String,
          },
          lat_fin: {
            type: String,
          },
          duracion: {
            type: Number,
          },
          precio_trayecto: {
            type: Number
          },
          descuento:{
            type: Number
          }, 
          estado: {
            type: Number,
          }
          
    })
);

module.exports = Ruta;
