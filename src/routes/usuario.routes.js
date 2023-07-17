const {
  createOneUsuario,
  loginUsuario,
  updateOneUsuario,
} = require("../controllers/usuario.controller");
const { Router } = require("express");
const { auth } = require("../middlewares/auth");

class UsuarioRouter {
  routesFromUsuario() {
    const usuarioRoutes = Router();
    usuarioRoutes.post("/usuarios", createOneUsuario);
    usuarioRoutes.post("/usuarios/login", loginUsuario);
    usuarioRoutes.patch("/usuarios/:identificador", auth, updateOneUsuario);
    return usuarioRoutes;
  }
}

module.exports = new UsuarioRouter();
