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
}

module.exports = new DepositoController();
