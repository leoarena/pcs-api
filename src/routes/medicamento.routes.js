const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const {
  createOneMedicamento,
  updateOneMedicamento,
} = require("../controllers/medicamento.controller.");

class MedicamentoRouter {
  routesFromMedicamento() {
    const medicamentoRoutes = Router();
    medicamentoRoutes.post("/medicamentos", auth, createOneMedicamento);
    medicamentoRoutes.patch(
      "/medicamentos/:identificador",
      auth,
      updateOneMedicamento
    );
    return medicamentoRoutes;
  }
}

module.exports = new MedicamentoRouter();
