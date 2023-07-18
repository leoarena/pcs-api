const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const {
  createOneDeposito,
  updateOneDeposito,
  updateStatus,
} = require("../controllers/deposito.controller");

class DepositoRouter {
  routesFromDeposito() {
    const depositoRoutes = Router();
    depositoRoutes.post("/depositos", auth, createOneDeposito);
    depositoRoutes.patch("/depositos/:identificador", auth, updateOneDeposito);
    depositoRoutes.patch(
      "/depositos/:identificador/status",
      auth,
      updateStatus
    );
    return depositoRoutes;
  }
}

module.exports = new DepositoRouter();
