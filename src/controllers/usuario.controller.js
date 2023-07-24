const { sign } = require("jsonwebtoken");
const { Usuario } = require("../models/usuario");
const { secret } = require("../config/database.config");

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

      if (!nome) throw new Error("O campo nome é obrigatório.");
      if (!sobrenome) throw new Error("O campo sobrenome é obrigatório.");
      if (!dataNascimento)
        throw new Error("O campo data de nascimento é obrigatório.");
      if (!cpf) throw new Error("O campo cpf é obrigatório.");
      if (!email) throw new Error("O campo email é obrigatório.");
      if (!senha) throw new Error("O campo senha é obrigatório.");

      const novoUsuario = await Usuario.create({
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
        .send({ message: "Usuário cadastrado com sucesso.", novoUsuario });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError" && error.fields.email)
        return response.status(409).send({
          message: "Não foi possível cadastrar o usuário.",
          cause: error.message,
        });

      if (error.name === "SequelizeUniqueConstraintError" && error.fields.cpf)
        return response.status(409).send({
          message: "Não foi possível cadastrar o usuário.",
          cause: error.message,
        });

      return response.status(400).send({
        message: "Não foi possível cadastrar o usuário.",
        cause: error.message,
      });
    }
  }

  async loginUsuario(request, response) {
    try {
      const { email, senha } = request.body;

      if (!email) throw new Error("O campo email é obrigatório.");
      if (!senha) throw new Error("O campo senha é obrigatório.");

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) throw new Error("Email não encontrado.");
      if (senha !== usuario.senha) throw new Error("Senha incorreta.");

      const payload = {
        identificador: usuario.identificador,
        email: usuario.email,
        nome: usuario.nome,
      };
      const token = sign(payload, secret, { expiresIn: "1d" });

      return response
        .status(200)
        .send({ message: "Login efetuado com sucesso.", token });
    } catch (error) {
      if (error.message === "Email não encontrado.")
        return response.status(404).send({
          message: "Erro ao efetuar login.",
          cause: error.message,
        });

      return response.status(400).send({
        message: "Erro ao efetuar login.",
        cause: error.message,
      });
    }
  }

  async updateOneUsuario(request, response) {
    try {
      const { identificador } = request.params;
      const { nome, sobrenome, genero, telefone } = request.body;

      const usuario = await Usuario.findOne({ where: { identificador } });
      if (!usuario) throw new Error("Usuário não encontrado.");

      if (!nome && !sobrenome && !genero && !telefone)
        throw new Error("Pelo menos um dos campos deve ser editado.");

      if (typeof nome !== "string" && typeof nome !== "undefined")
        throw new Error("O campo nome precisa ser do tipo string.");

      if (typeof sobrenome !== "string" && typeof sobrenome !== "undefined")
        throw new Error("O campo sobrenome precisa ser do tipo string.");

      if (typeof genero !== "string" && typeof genero !== "undefined")
        throw new Error("O campo genero precisa ser do tipo string.");

      if (typeof telefone !== "string" && typeof telefone !== "undefined")
        throw new Error("O campo telefone precisa ser do tipo string.");

      await usuario.update(
        { nome, sobrenome, genero, telefone },
        { where: { identificador } }
      );

      return response.status(204).send();
    } catch (error) {
      return response.status(400).send({
        message: "Não foi possível atualizar o usuário.",
        cause: error.message,
      });
    }
  }

  async updateStatus(request, response) {
    try {
      const { identificador } = request.params;
      const { status } = request.body;

      const usuario = await Usuario.findOne({ where: { identificador } });
      if (!usuario)
        return response
          .status(404)
          .send({ message: "Usuário não encontrado." });

      if (!status)
        return response
          .status(400)
          .send({ message: "O campo status é obrigatório." });

      const statusValido = status === "Ativo" || status === "Inativo";
      if (!statusValido)
        return response.status(400).send({ message: "Status inválido." });

      await usuario.update({ status }, { where: { identificador } });

      return response
        .status(200)
        .send({ message: "Status atualizado com sucesso.", usuario });
    } catch (error) {
      return response.status(400).send({
        message: "Não foi possível atualizar o status do usuário.",
        cause: error.errors[0].message || error.message,
      });
    }
  }

  async updateSenha(request, response) {
    try {
      const { identificador } = request.params;
      const { senha } = request.body;

      const usuario = await Usuario.findOne({ where: { identificador } });
      if (!usuario)
        return response
          .status(404)
          .send({ message: "Usuário não encontrado." });

      if (!senha)
        return response
          .status(400)
          .send({ message: "O campo senha é obrigatório." });

      const senhaValida =
        /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}/;

      if (!senhaValida.test(senha))
        return response.status(400).send({
          message:
            "A senha deve ter no mínimo 8 caracteres, sendo pelo menos 1 letra maiúscula, 1 número e 1 caractere especial.",
        });

      await usuario.update({ senha }, { where: { identificador } });

      return response.status(204).send();
    } catch (error) {
      return response.status(400).send({
        message: "Não foi possível alterar a senha do usuário.",
        cause: message.error,
      });
    }
  }

  async listOneUsuario(request, response) {
    const { identificador } = request.params;
    const usuario = await Usuario.findOne({
      where: { identificador },
      attributes: [
        "identificador",
        "nome",
        "sobrenome",
        "genero",
        "dataNascimento",
        "cpf",
        "telefone",
        "email",
        "status",
      ],
    });

    if (!usuario)
      return response.status(404).send({ message: "Usuário não encontrado." });
    else return response.status(200).send(usuario);
  }
}

module.exports = new UsuarioController();
