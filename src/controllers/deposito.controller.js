const { Deposito } = require("../models/deposito");

class DepositoController {
  async createOneDeposito(request, response) {
    try {
      const {
        usuarioId,
        razaoSocial,
        cnpj,
        nomeFantasia,
        email,
        telefone,
        celular,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        complemento,
        latitude,
        longitude,
        status,
      } = request.body;

      if (!usuarioId) throw new Error("O campo usuário id é obrigatório.");
      if (!razaoSocial) throw new Error("O campo razão social é obrigatório.");
      if (!cnpj) throw new Error("O campo CNPJ é obrigatório.");
      if (!nomeFantasia)
        throw new Error("O campo nome fantasia é obrigatório.");
      if (!email) throw new Error("O campo email é obrigatório.");
      if (!celular) throw new Error("O campo celular é obrigatório.");
      if (!cep) throw new Error("O campo cep é obrigatório.");
      if (!logradouro) throw new Error("O campo logradouro é obrigatório.");
      if (!numero) throw new Error("O campo número é obrigatório.");
      if (!bairro) throw new Error("O campo bairro é obrigatório.");
      if (!cidade) throw new Error("O campo cidade é obrigatório.");
      if (!estado) throw new Error("O campo estado é obrigatório.");
      if (!status) throw new Error("O campo status é obrigatório.");

      const novoDeposito = await Deposito.create({
        usuarioId,
        razaoSocial,
        cnpj,
        nomeFantasia,
        email,
        telefone,
        celular,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        complemento,
        latitude,
        longitude,
        status,
      });

      return response
        .status(201)
        .send({ message: "Depósito cadastrado com sucesso.", novoDeposito });
    } catch (error) {
      if (
        error.name === "SequelizeUniqueConstraintError" &&
        error.fields.razao_social
      )
        return response.status(409).send({
          message: "Não foi possível cadastrar o depósito.",
          cause: error.message,
        });

      if (error.name === "SequelizeUniqueConstraintError" && error.fields.cnpj)
        return response.status(409).send({
          message: "Não foi possível cadastrar o depósito.",
          cause: error.message,
        });

      if (error.name === "SequelizeUniqueConstraintError" && error.fields.email)
        return response.status(409).send({
          message: "Não foi possível cadastrar o depósito.",
          cause: error.message,
        });

      return response.status(400).send({
        message: "Não foi possível cadastrar o depósito.",
        cause: error.message,
      });
    }
  }

  async updateOneDeposito(request, response) {
    try {
      const { identificador } = request.params;
      const {
        nomeFantasia,
        email,
        telefone,
        celular,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        complemento,
        latitude,
        longitude,
      } = request.body;

      const deposito = await Deposito.findOne({ where: { identificador } });
      if (!deposito) throw new Error("Depósito não encontrado.");

      if (
        !nomeFantasia &&
        !email &&
        !telefone &&
        !celular &&
        !cep &&
        !logradouro &&
        !numero &&
        !bairro &&
        !cidade &&
        !estado &&
        !complemento &&
        !latitude &&
        !longitude
      )
        throw new Error("Pelo menos um dos campos deve ser editado.");

      if (
        typeof nomeFantasia !== "string" &&
        typeof nomeFantasia !== "undefined"
      )
        throw new Error("O campo nome fantasia precisa ser do tipo string.");

      if (typeof email !== "string" && typeof email !== "undefined")
        throw new Error("O campo email precisa ser do tipo string.");

      if (typeof telefone !== "string" && typeof telefone !== "undefined")
        throw new Error("O campo telefone precisa ser do tipo string.");

      if (typeof celular !== "string" && typeof celular !== "undefined")
        throw new Error("O campo celular precisa ser do tipo string.");

      if (typeof cep !== "string" && typeof cep !== "undefined")
        throw new Error("O campo cep precisa ser do tipo string.");

      if (typeof logradouro !== "string" && typeof logradouro !== "undefined")
        throw new Error("O campo logradouro precisa ser do tipo string.");

      if (typeof numero !== "string" && typeof numero !== "undefined")
        throw new Error("O campo numero precisa ser do tipo string.");

      if (typeof bairro !== "string" && typeof bairro !== "undefined")
        throw new Error("O campo bairro precisa ser do tipo string.");

      if (typeof cidade !== "string" && typeof cidade !== "undefined")
        throw new Error("O campo cidade precisa ser do tipo string.");

      if (typeof estado !== "string" && typeof estado !== "undefined")
        throw new Error("O campo estado precisa ser do tipo string.");

      if (typeof complemento !== "string" && typeof complemento !== "undefined")
        throw new Error("O campo complemento precisa ser do tipo string.");

      if (typeof latitude !== "string" && typeof latitude !== "undefined")
        throw new Error("O campo latitude precisa ser do tipo string.");

      if (typeof longitude !== "string" && typeof longitude !== "undefined")
        throw new Error("O campo longitude precisa ser do tipo string.");

      await deposito.update(
        {
          nomeFantasia,
          email,
          telefone,
          celular,
          cep,
          logradouro,
          numero,
          bairro,
          cidade,
          estado,
          complemento,
          latitude,
          longitude,
        },
        { where: { identificador } }
      );

      return response.status(204).send();
    } catch (error) {
      return response.status(400).send({
        message: "Não foi possível atualizar o depósito.",
        cause: error.message,
      });
    }
  }

  async updateStatus(request, response) {
    try {
      const { identificador } = request.params;
      const { status } = request.body;

      const deposito = await Deposito.findOne({ where: { identificador } });
      if (!deposito)
        return response
          .status(404)
          .send({ message: "Depósito não encontrado." });

      if (!status)
        return response
          .status(400)
          .send({ message: "O campo status é obrigatório." });

      const statusValido = status === "Ativo" || status === "Inativo";
      if (!statusValido)
        return response.status(400).send({ message: "Status inválido." });

      await deposito.update({ status }, { where: { identificador } });
      return response.status(204).send();
    } catch (error) {
      return response.status(400).send({
        message: "Não foi possível atualizar o status do depósito.",
        cause: error.errors[0].message || error.message,
      });
    }
  }

  async listDepositos(request, response) {
    const { status } = request.query;
    const statusValido = status === "ATIVO" || status === "INATIVO";
    let statusConvertido = null;
    const depositos = await Deposito.findAll();

    if (status === "ATIVO") statusConvertido = "Ativo";
    if (status === "INATIVO") statusConvertido = "Inativo";

    if (statusValido) {
      const depositosFiltrados = await Deposito.findAll({
        where: { status: statusConvertido },
      });
      return response.status(200).send({ depositosFiltrados });
    }

    return response.status(200).send({ depositos });
  }

  async listOneDeposito(request, response) {
    const { identificador } = request.params;
    const deposito = await Deposito.findOne({ where: { identificador } });

    if (!deposito)
      return response.status(404).send({ message: "Depósito não encontrado." });
    return response.status(200).send(deposito);
  }

  async deleteOneDeposito(request, response) {
    const { identificador } = request.params;
    const deposito = await Deposito.findOne({ where: { identificador } });

    if (!deposito)
      return response.status(404).send({ message: "Depósito não encontrado." });

    if (deposito.status === "Ativo")
      return response
        .status(400)
        .send({ message: "Não é possível excluir um depósito ativo." });

    await Deposito.destroy({ where: { identificador } });
    return response.status(204).send();
  }
}

module.exports = new DepositoController();
