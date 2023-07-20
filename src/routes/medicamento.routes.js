const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const {
  createOneMedicamento,
  updateOneMedicamento,
  listMedicamentos,
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
    medicamentoRoutes.get("/medicamentos", auth, listMedicamentos);
    return medicamentoRoutes;
  }
}

module.exports = new MedicamentoRouter();
