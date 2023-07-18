const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const { createOneDeposito } = require("../controllers/deposito.controller");

class DepositoRouter {
  routesFromDeposito() {
    const depositoRoutes = Router();
    depositoRoutes.post("/depositos", auth, createOneDeposito);
    return depositoRoutes;
  }
}

module.exports = new DepositoRouter();
