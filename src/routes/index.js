const { Router } = require("express");
const { routesFromUsuario } = require("./usuario.routes");
const { routesFromDeposito } = require("./deposito.routes");
const { routesFromMedicamento } = require("./medicamento.routes");

const routes = Router();

routes.use("/api", [
  routesFromUsuario(),
  routesFromDeposito(),
  routesFromMedicamento(),
]);

module.exports = routes;
