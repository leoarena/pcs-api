const {
  createOneUsuario,
  loginUsuario,
  updateOneUsuario,
  updateStatus,
} = require("../controllers/usuario.controller");
const { Router } = require("express");
const { auth } = require("../middlewares/auth");

class UsuarioRouter {
  routesFromUsuario() {
    const usuarioRoutes = Router();
    usuarioRoutes.post("/usuarios", createOneUsuario);
    usuarioRoutes.post("/usuarios/login", loginUsuario);
    usuarioRoutes.patch("/usuarios/:identificador", auth, updateOneUsuario);
    usuarioRoutes.patch("/usuarios/:identificador/status", auth, updateStatus);
    return usuarioRoutes;
  }
}

module.exports = new UsuarioRouter();
