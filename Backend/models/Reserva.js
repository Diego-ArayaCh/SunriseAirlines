const mongoose = require('mongoose');

const Reserva = mongoose.model(
    "Reserva", 
    new mongoose.Schema({ 
        vuelo_id_1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vuelo',
          },
          vuelo_id_2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vuelo',
          },
          usuario_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
          },
          proceso: {
            type: Number
          },
          precio_t: {
            type: Number
          },
          fecha: {
            type: Date,
            default: Date.now,
          },
          detalle: {
            type: String,
          },
          num_asiento: {
            type: String,
          }
    })
);

module.exports = Reserva;