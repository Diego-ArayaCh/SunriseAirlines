// middleware for doing role-based permissions
const permit = (...permittedRoles) => {
  // return a middleware
  return (request, response, next) => {
    const { usuario } = request;
   // console.log(usuario)
    // valida si el usuario ha sido autenticado, y si tiene el rol necesario
    if (usuario && permittedRoles.includes(usuario.rol)) {
      next();
    } else {
      // retorna forbidden si el usuario no tiene acceso
      response.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports.permit = permit;
