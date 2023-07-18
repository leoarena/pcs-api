const {
  createOneUsuario,
  loginUsuario,
  updateOneUsuario,
  updateStatus,
  updateSenha,
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
    usuarioRoutes.patch("/usuarios/:identificador/senha", auth, updateSenha);
    return usuarioRoutes;
  }
}

module.exports = new UsuarioRouter();
