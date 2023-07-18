const { Router } = require("express");
const { routesFromUsuario } = require("./usuario.routes");
const { routesFromDeposito } = require("./deposito.routes");

const routes = Router();

routes.use("/api", [routesFromUsuario(), routesFromDeposito()]);

module.exports = routes;
