const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


//nuevo
const UsuarioSchema = new Schema({
  rol: {
    type: Number,
  },
  usuario: {
    type: String,
  },
  pwd: {
    type: String,
  },
  nombre: {
    type: String,
  },
  apellidos: {
    type: String,
  },
  correo: {
    type: String,
  },
  fech_nacimiento: {
    type: Date,
    default: Date.now,
  },
  tel_trabajo: {
    type: String,
  },
  tel_celular: {
    type: String,
  },
  estado: {
    type: Number
  },
  direccion: {
    type: Schema.Types.ObjectId,
    ref: 'Direccion'
  },
  imagen: {
    type: String
  }
});

UsuarioSchema.pre('save', function (next) {
    var user = this;
  
    console.log("entra")
    if (this.isModified('pwd') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.pwd, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
              
                user.pwd = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UsuarioSchema.methods.comparePassword = async (passw, userPassw, cb) => {
    bcrypt.compare(passw, userPassw, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


const UsuarioModel = model("Usuario", UsuarioSchema);

module.exports = UsuarioModel;
