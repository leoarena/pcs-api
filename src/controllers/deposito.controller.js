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

      if (!usuarioId)
        return response
          .status(400)
          .send({ message: "O campo usuário id é obrigatório." });

      if (!razaoSocial)
        return response
          .status(400)
          .send({ message: "O campo razão social é obrigatório." });

      const razaoSocialExistente = await Deposito.findOne({
        where: { razaoSocial },
      });
      if (razaoSocialExistente)
        return response
          .status(409)
          .send({ message: "Razão social já cadastrado." });

      if (!cnpj)
        return response
          .status(400)
          .send({ message: "O campo CNPJ é obrigatório." });

      const cnpjExistente = await Deposito.findOne({ where: { cnpj } });
      if (cnpjExistente)
        return response.status(409).send({ message: "CNPJ já cadastrado." });

      if (!nomeFantasia)
        return response
          .status(400)
          .send({ message: "O campo nome fantasia é obrigatório." });

      if (!email)
        return response
          .status(400)
          .send({ message: "O campo email é obrigatório." });

      if (!celular)
        return response
          .status(400)
          .send({ message: "O campo celular é obrigatório." });

      if (!cep)
        return response
          .status(400)
          .send({ message: "O campo cep é obrigatório." });

      if (!logradouro)
        return response
          .status(400)
          .send({ message: "O campo logradouro é obrigatório." });

      if (!numero)
        return response
          .status(400)
          .send({ message: "O campo numero é obrigatório." });

      if (!bairro)
        return response
          .status(400)
          .send({ message: "O campo bairro é obrigatório." });

      if (!cidade)
        return response
          .status(400)
          .send({ message: "O campo cidade é obrigatório." });

      if (!estado)
        return response
          .status(400)
          .send({ message: "O campo estado é obrigatório." });

      if (!status)
        return response
          .status(400)
          .send({ message: "O campo status é obrigatório." });

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
      if (!deposito)
        return response
          .status(404)
          .send({ message: "Depósito não encontrado." });

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
        return response
          .status(400)
          .send({ message: "Pelo menos um dos campos deve ser editado." });

      const nomeFantasiaValido =
        typeof nomeFantasia === "string" || typeof nomeFantasia === "undefined";
      if (!nomeFantasiaValido)
        return response.status(400).send({
          message: "O campo nome fantasia precisa ser do tipo string.",
        });

      const emailValido =
        typeof email === "string" || typeof email === "undefined";
      if (!emailValido)
        return response.status(400).send({
          message: "O campo email precisa ser do tipo string.",
        });

      const telefoneValido =
        typeof telefone === "string" || typeof telefone === "undefined";
      if (!telefoneValido)
        return response.status(400).send({
          message: "O campo telefone precisa ser do tipo string.",
        });

      const celularValido =
        typeof celular === "string" || typeof celular === "undefined";
      if (!celularValido)
        return response.status(400).send({
          message: "O campo celular precisa ser do tipo string.",
        });

      const cepValido = typeof cep === "string" || typeof cep === "undefined";
      if (!cepValido)
        return response.status(400).send({
          message: "O campo cep precisa ser do tipo string.",
        });

      const logradouroValido =
        typeof logradouro === "string" || typeof logradouro === "undefined";
      if (!logradouroValido)
        return response.status(400).send({
          message: "O campo logradouro precisa ser do tipo string.",
        });

      const numeroValido =
        typeof numero === "string" || typeof numero === "undefined";
      if (!numeroValido)
        return response.status(400).send({
          message: "O campo numero precisa ser do tipo string.",
        });

      const bairroValido =
        typeof bairro === "string" || typeof bairro === "undefined";
      if (!bairroValido)
        return response.status(400).send({
          message: "O campo bairro precisa ser do tipo string.",
        });

      const cidadeValido =
        typeof cidade === "string" || typeof cidade === "undefined";
      if (!cidadeValido)
        return response.status(400).send({
          message: "O campo cidade precisa ser do tipo string.",
        });

      const estadoValido =
        typeof estado === "string" || typeof estado === "undefined";
      if (!estadoValido)
        return response.status(400).send({
          message: "O campo estado precisa ser do tipo string.",
        });

      const complementoValido =
        typeof complemento === "string" || typeof complemento === "undefined";
      if (!complementoValido)
        return response.status(400).send({
          message: "O campo complemento precisa ser do tipo string.",
        });

      const latitudeValido =
        typeof latitude === "string" || typeof latitude === "undefined";
      if (!latitudeValido)
        return response.status(400).send({
          message: "O campo latitude precisa ser do tipo string.",
        });

      const longitudeValido =
        typeof longitude === "string" || typeof longitude === "undefined";
      if (!longitudeValido)
        return response.status(400).send({
          message: "O campo longitude precisa ser do tipo string.",
        });

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
        cause: error.message,
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
    } else return response.status(200).send({ depositos });
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
    else await Deposito.destroy({ where: { identificador } });
    return response.status(204).send();
  }
}

module.exports = new DepositoController();
