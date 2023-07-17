const { createOneUsuario } = require("../controllers/usuario.controller");
const { Router } = require("express");

class UsuarioRouter {
  routesFromUsuario() {
    const usuarioRoutes = Router();
    usuarioRoutes.post("/usuarios", createOneUsuario);
    return usuarioRoutes;
  }
}

module.exports = new UsuarioRouter();
