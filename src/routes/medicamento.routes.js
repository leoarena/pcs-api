const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const {
  createOneMedicamento,
} = require("../controllers/medicamento.controller.");

class MedicamentoRouter {
  routesFromMedicamento() {
    const medicamentoRoutes = Router();
    medicamentoRoutes.post("/medicamentos", auth, createOneMedicamento);
    return medicamentoRoutes;
  }
}

module.exports = new MedicamentoRouter();
