const { Medicamento } = require("../models/medicamento");

class MedicamentoController {
  async createOneMedicamento(request, response) {
    try {
      const {
        usuarioId,
        depositoId,
        nomeMedicamento,
        nomeLaboratorio,
        descricao,
        dosagem,
        unidadeDosagem,
        tipo,
        precoUnitario,
        quantidade,
      } = request.body;

      if (!nomeMedicamento)
        throw new Error("O campo nome do medicamento é obrigatório.");
      if (!nomeLaboratorio)
        throw new Error("O campo nome do laboratório é obrigatório.");
      if (!dosagem) throw new Error("O campo dosagem é obrigatório.");
      if (!unidadeDosagem)
        throw new Error("O campo unidade da dosagem é obrigatório.");
      if (!tipo) throw new Error("O campo tipo é obrigatório.");
      if (!precoUnitario)
        throw new Error("O campo preço unitário é obrigatório.");
      if (!quantidade) throw new Error("O campo quantidade é obrigatório.");

      const novoMedicamento = await Medicamento.create({
        usuarioId,
        depositoId,
        nomeMedicamento,
        nomeLaboratorio,
        descricao,
        dosagem,
        unidadeDosagem,
        tipo,
        precoUnitario,
        quantidade,
      });

      return response.status(201).send({
        message: "Medicamento cadastrado com sucesso.",
        novoMedicamento,
      });
    } catch (error) {
      if (
        error.name === "SequelizeUniqueConstraintError" &&
        error.fields.nome_medicamento
      )
        return response.status(409).send({
          message: "Não foi possível cadastrar o medicamento.",
          cause: error.message,
        });

      return response.status(400).send({
        message: "Não foi possível cadastrar o medicamento.",
        cause: error.message,
      });
    }
  }

  async updateOneMedicamento(request, response) {
    try {
      const { descricao, precoUnitario, quantidade } = request.body;
      const { identificador } = request.params;

      const medicamento = await Medicamento.findOne({
        where: { identificador },
      });
      if (!medicamento) throw new Error("Medicamento não encontrado.");

      if (!descricao && !precoUnitario && !quantidade)
        throw new Error("Pelo menos um dos campos deve ser editado.");

      if (typeof descricao !== "string" && typeof descricao !== "undefined")
        throw new Error("O campo descrição precisa ser do tipo string.");

      if (
        typeof precoUnitario !== "number" &&
        typeof precoUnitario !== "undefined"
      )
        throw new Error("O campo preço unitário precisa ser do tipo number.");

      if (typeof quantidade !== "number" && typeof quantidade !== "undefined")
        throw new Error("O campo quantidade precisa ser do tipo number.");

      await medicamento.update(
        { descricao, precoUnitario, quantidade },
        { where: { identificador } }
      );

      return response
        .status(200)
        .send({ message: "Medicamento atualizado com sucesso.", medicamento });
    } catch (error) {
      if (error.message === "Medicamento não encontrado.")
        return response.status(404).send({
          message: "Não foi possível atualizar o medicamento.",
          cause: error.message,
        });

      return response.status(400).send({
        message: "Não foi possível atualizar o medicamento.",
        cause: error.message,
      });
    }
  }

  async listMedicamentos(request, response) {
    const { tipo } = request.query;
    const tipoValido = tipo === "CONTROLADO" || tipo === "NAOCONTROLADO";
    let tipoConvertido = null;
    const medicamentos = await Medicamento.findAll();

    if (tipo === "CONTROLADO") tipoConvertido = "Medicamento Controlado";
    if (tipo === "NAOCONTROLADO") tipoConvertido = "Medicamento Não Controlado";

    if (tipoValido) {
      const medicamentosFiltrados = await Medicamento.findAll({
        where: { tipo: tipoConvertido },
      });
      return response.status(200).send({ medicamentosFiltrados });
    } else return response.status(200).send({ medicamentos });
  }

  async listOneMedicamento(request, response) {
    const { identificador } = request.params;
    const medicamento = await Medicamento.findOne({ where: { identificador } });

    if (!medicamento)
      return response
        .status(404)
        .send({ message: "Medicamento não encontrado." });
    return response.status(200).send(medicamento);
  }

  async deleteOneMedicamento(request, response) {
    const { identificador } = request.params;
    const medicamento = await Medicamento.findOne({ where: { identificador } });

    if (!medicamento)
      return response
        .status(404)
        .send({ message: "Medicamento não encontrado." });

    await Medicamento.destroy({ where: { identificador } });
    return response.status(204).send();
  }
}

module.exports = new MedicamentoController();
