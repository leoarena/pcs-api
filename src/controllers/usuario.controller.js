const { Usuario } = require("../models/usuario");

class UsuarioController {
  async createOneUsuario(request, response) {
    try {
      const {
        nome,
        sobrenome,
        genero,
        dataNascimento,
        cpf,
        telefone,
        email,
        senha,
        status,
      } = request.body;

      if (!nome)
        return response
          .status(400)
          .send({ message: "O campo nome é obrigatório." });

      if (!sobrenome)
        return response
          .status(400)
          .send({ message: "O campo sobrenome é obrigatório." });

      if (!dataNascimento)
        return response
          .status(400)
          .send({ message: "O campo data de nascimento é obrigatório." });

      if (!cpf)
        return response
          .status(400)
          .send({ message: "O campo CPF é obrigatório." });

      const cpfExistente = await Usuario.findOne({ where: { cpf } });
      if (cpfExistente)
        return response.status(409).send({ message: "CPF já cadastrado." });

      if (!email)
        return response
          .status(400)
          .send({ message: "O campo email é obrigatório." });

      if (!senha)
        return response
          .status(400)
          .send({ message: "O campo senha é obrigatório." });

      const senhaValida =
        /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Z\d@$!%*?&]{8,}/;

      if (!senhaValida.test(senha))
        return response.status(400).send({
          message:
            "A senha deve ter no mínimo 8 caracteres, sendo pelo menos 1 letra maiúscula, 1 número e 1 caractere especial.",
        });

      const data = await Usuario.create({
        nome,
        sobrenome,
        genero,
        dataNascimento,
        cpf,
        telefone,
        email,
        senha,
        status,
      });

      return response
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso.", data });
    } catch (error) {
      console.log(error.message);

      return response.status(400).send({
        message: "Não foi possível cadastrar o usuário.",
        cause: error.message,
      });
    }
  }
}

module.exports = new UsuarioController();
