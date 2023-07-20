const { where } = require("sequelize");
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
        return response
          .status(400)
          .send({ message: "O campo nome do medicamento é obrigatório." });

      const nomeExistente = await Medicamento.findOne({
        where: { nomeMedicamento },
      });
      if (nomeExistente)
        return response
          .status(409)
          .send({ message: "Nome do medicamento já cadastrado." });

      if (!nomeLaboratorio)
        return response
          .status(400)
          .send({ message: "O campo nome do laboratório é obrigatório." });

      if (!dosagem)
        return response
          .status(400)
          .send({ message: "O campo dosagem é obrigatório." });

      if (!unidadeDosagem)
        return response
          .status(400)
          .send({ message: "O campo unidade da dosagem é obrigatório." });

      if (!tipo)
        return response
          .status(400)
          .send({ message: "O campo tipo é obrigatório." });

      if (!precoUnitario)
        return response
          .status(400)
          .send({ message: "O campo preço unitário é obrigatório." });

      if (!quantidade)
        return response
          .status(400)
          .send({ message: "O campo quantidade é obrigatório." });

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

      if (!medicamento)
        return response
          .status(404)
          .send({ message: "Medicamento não encontrado." });

      if (!descricao && !precoUnitario && !quantidade)
        return response
          .status(400)
          .send({ message: "Pelo menos um dos campos deve ser editado." });

      const descricaoValida =
        typeof descricao === "string" || typeof descricao === "undefined";
      if (!descricaoValida)
        return response
          .status(400)
          .send({ message: "O campo descrição precisa ser do tipo string." });

      const precoUnitarioValido =
        typeof precoUnitario === "number" ||
        typeof precoUnitario === "undefined";
      if (!precoUnitarioValido)
        return response.status(400).send({
          message: "O campo preço unitário precisa ser do tipo number.",
        });

      const quantidadeValida =
        typeof quantidade === "number" || typeof quantidade === "undefined";
      if (!quantidadeValida)
        return response
          .status(400)
          .send({ message: "O campo quantidade precisa ser do tipo number." });

      await medicamento.update(
        { descricao, precoUnitario, quantidade },
        { where: { identificador } }
      );

      return response
        .status(200)
        .send({ message: "Medicamento atualizado com sucesso.", medicamento });
    } catch (error) {
      return response.status(400).send({
        message: "Não foi possível atualizar o medicamento.",
        cause: error.message,
      });
    }
  }
}

module.exports = new MedicamentoController();
