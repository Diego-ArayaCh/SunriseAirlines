const mongoose = require('mongoose');

const Vuelo = mongoose.model(
    "Vuelo", 
    new mongoose.Schema({ 
        avion_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aviones',
          },
          ruta_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ruta',
          },
          horario_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Horario',
          },
          hora_lleg: {
            type: String,
          },
          asientos: [],
          estado:  {
            type: Number,
          }
    })
);

module.exports = Vuelo;