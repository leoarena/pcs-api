const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const {
  createOneDeposito,
  updateOneDeposito,
  updateStatus,
  listDepositos,
  listOneDeposito,
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
    depositoRoutes.get("/depositos", auth, listDepositos);
    depositoRoutes.get("/depositos/:identificador", auth, listOneDeposito);
    return depositoRoutes;
  }
}

module.exports = new DepositoRouter();
