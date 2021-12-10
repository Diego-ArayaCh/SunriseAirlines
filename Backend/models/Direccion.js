const mongoose = require('mongoose');

const Direccion = mongoose.model(
    "Direccion", 
    new mongoose.Schema({ 
        sennas: {
            type: String,
            
          },
          latitud: {
            type: String,
      
          },
          longitud: {
            type: String,
          },
         
    })
);

module.exports = Direccion;