const mongoose = require('mongoose');

const Horario = mongoose.model(
    "Horario", 
    new mongoose.Schema({ 
        fecha: {
          type: Date,
          },
          hora_sal: {
            type: String,
          }
    })
);

module.exports = Horario;