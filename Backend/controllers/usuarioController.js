const UsuarioModel = require("../models/Usuario");
const DireccionModel = require("../models/Direccion");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

//Se obtiene las variables de entorno
const config = "secret";

// creación de nuevos usuarios
module.exports.signup = async (req, res, next) => {
  var {rol, usuario, pwd, nombre, apellidos, correo, fech_nacimiento, tel_trabajo, tel_celular, estado, direccion, imagen} = req.body;

  const { sennas, latitud, longitud } = direccion
  console.log(direccion.latitud+" , "+direccion.longitud);
  const direccionUser = await new DireccionModel({ sennas: sennas, latitud: latitud, longitud: longitud });
  direccionUser.save();

  
  direccion = direccionUser._id;
  const User = await new UsuarioModel({rol, usuario, pwd, nombre, apellidos, correo, fech_nacimiento, tel_trabajo, tel_celular, estado, direccion, imagen});
  User.save();
  res.json(User);
};

// logueo de usuarios
module.exports.signin = async (req, res, next) => {

  const { usuario, pwd } = req.body;

  const user = await UsuarioModel.findOne({ usuario: usuario }).exec();

  if (!user) {
      
      res.json({ success: false, msg: 'Authentication failed. User not found.' });
  } 
  
  if (user.estado == 0) {
    res.json({ success: false, msg: 'Authentication failed. User is inactive.' });
  }else{
      
      //Si el usuario existe verifica si las contraseñas
      
      user.comparePassword(pwd, user.pwd, function (err, isMatch) {
          if (isMatch && !err) {
            // Si el usuario es correcto y la contraseña coindice se procede a crear el token
            const token = jwt.sign(
              { usuario: usuario },
              config,
              { expiresIn: "2h" }
            );
            // return the information including token as JSON
            const payload = { rol: user.rol, usuario: user.usuario, _id: user._id };
            res.json({ success: true, token: token, user: payload });
          } else {
              //si la contraseña no coincide se procede a indicar el error
              //res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
              res.json({ success: false, msg: 'Authentication failed. Wrong password.' });
          }
      });
  }
};

module.exports.get = async (req, res, next) => {
    
        const usuario = await UsuarioModel.find({rol:0}).populate("direccion").exec();
        res.json(usuario);
    
   

}
module.exports.getUsernames = async (req, res, next) => {
    
  const usuario = await UsuarioModel.find({},{usuario:1,_id:0}).exec();
  res.json(usuario);



}

module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  var usuario = await UsuarioModel.findOne({ _id: id }).populate("direccion").exec();
  usuario.pwd='';
  res.json(usuario);
};



module.exports.create = async (req, res, next) => {
    var {rol, usuario, pwd, nombre, apellidos, correo, fech_nacimiento, tel_trabajo, tel_celular, estado, direccion, imagen} = req.body;

    const { sennas, latitud, longitud } = direccion
    console.log(direccion.latitud+" , "+direccion.longitud);
    const direccionUser = await new DireccionModel({ sennas: sennas, latitud: latitud, longitud: longitud });
    direccionUser.save();

    
    direccion = direccionUser._id;
    const User = await new UsuarioModel({rol, usuario, pwd, nombre, apellidos, correo, fech_nacimiento, tel_trabajo, tel_celular, estado, direccion, imagen});
    User.save();
    res.json(User);
  };


  module.exports.delete = async (req, res, next) => {
    var usuario = await UsuarioModel.findById(req.params.id)
   usuario = await UsuarioModel.findByIdAndRemove(req.params.id);
    // si Usuario es null significa que no existe el registro
    if (usuario) {
      res.json({ result: `User deleted successfully`, post: usuario });
    } else {
      res.json({ result: "User's id Invalid", post: usuario });
    }

    
    const direccion = await DireccionModel.findByIdAndRemove(usuario.direccion._id);
    
  };


  module.exports.update = async (req, res, next) => {

   

    var {rol, usuario, pwd, nombre, apellidos, correo, fech_nacimiento, tel_trabajo, tel_celular, estado, direccion, imagen } = req.body;
    const { sennas, latitud, longitud } = direccion
    const direccionUser = await DireccionModel.findOneAndUpdate(
        { _id: direccion._id },
        {sennas, latitud, longitud}, // ==> {title: title, body: body}
        { new: true } // retornar el registro que hemos modificado con los nuevos valores
      );
      console.log(pwd)
      bcrypt.genSalt(10, function (err, salt) {
        
        bcrypt.hash(pwd, salt, null, async function (err, hash) {
           
          
          pwd = hash;
          const user = await UsuarioModel.findOneAndUpdate(
      
            { _id: req.params.id },
            {rol, usuario, pwd, nombre, apellidos, correo, fech_nacimiento, tel_trabajo, tel_celular, estado, imagen}, // ==> {title: title, body: body}
            { new: true } // retornar el registro que hemos modificado con los nuevos valores
          );
      
          
          res.json(user);
        });
    });
  
    
  };

  module.exports.updateState = async (req, res, next) => {
    const {estado } = req.body;
    const user = await UsuarioModel.findOneAndUpdate(
      { _id: req.params.id },
      {estado}, // ==> {title: title, body: body}
      { new: true } // retornar el registro que hemos modificado con los nuevos valores
    );
    res.json(user);
  };