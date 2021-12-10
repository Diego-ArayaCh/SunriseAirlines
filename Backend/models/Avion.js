const mongoose = require('mongoose');

const Aviones = mongoose.model(
    "Aviones", 
    new mongoose.Schema({ 
        modelo: {
            type: String,
          },
          anho: {
            type: Number
          },
          marca: {
            type: String,
          },
          cant_pasa: {
            type: Number
          },
          cant_filas: {
            type: Number
          },
          cant_af: {
            type: Number
          },
          imagen: {
            type: String,
          },
          estado: {
            type: Number
          }
    })
);

module.exports = Aviones;