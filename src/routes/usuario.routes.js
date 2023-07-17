const {
  createOneUsuario,
  loginUsuario,
} = require("../controllers/usuario.controller");
const { Router } = require("express");

class UsuarioRouter {
  routesFromUsuario() {
    const usuarioRoutes = Router();
    usuarioRoutes.post("/usuarios", createOneUsuario);
    usuarioRoutes.post("/usuarios/login", loginUsuario);
    return usuarioRoutes;
  }
}

module.exports = new UsuarioRouter();
