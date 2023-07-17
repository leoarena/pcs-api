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

      const emailExistente = await Usuario.findOne({ where: { email } });
      if (emailExistente)
        return response.status(409).send({ message: "Email já cadastrado." });

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
      return response.status(400).send({
        message: "Não foi possível cadastrar o usuário.",
        cause: error.message,
      });
    }
  }

  async loginUsuario(request, response) {
    try {
      const { email, senha } = request.body;

      if (!email)
        return response
          .status(400)
          .send({ message: "O campo email é obrigatório." });

      if (!senha)
        return response
          .status(400)
          .send({ message: "O campo senha é obrigatório." });

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario)
        return response.status(404).send({ message: "Email não encontrado." });

      const senhaCorreta = senha === usuario.senha;
      if (!senhaCorreta)
        return response.status(400).send({ message: "Senha incorreta." });

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
      return response
        .status(400)
        .send({ message: "Erro ao efetuar login.", cause: error.message });
    }
  }

  async updateOneUsuario(request, response) {
    try {
      const { identificador } = request.params;
      const { nome, sobrenome, genero, telefone } = request.body;

      const usuario = await Usuario.findOne({ where: { identificador } });
      if (!usuario)
        return response
          .status(404)
          .send({ message: "Usuário não encontrado." });

      if (!nome && !sobrenome && !genero && !telefone)
        return response
          .status(400)
          .send({ message: "Pelo menos um dos campos deve ser editado." });

      const nomeValido =
        typeof nome === "string" || typeof nome === "undefined";
      if (!nomeValido)
        return response
          .status(400)
          .send({ message: "O campo nome precisa ser do tipo string." });

      const sobrenomeValido =
        typeof sobrenome === "string" || typeof sobrenome === "undefined";
      if (!sobrenomeValido)
        return response
          .status(400)
          .send({ message: "O campo sobrenome precisa ser do tipo string." });

      const generoValido =
        typeof genero === "string" || typeof genero === "undefined";
      if (!generoValido)
        return response
          .status(400)
          .send({ message: "O campo genero precisa ser do tipo string." });

      const telefoneValido =
        typeof telefone === "string" || typeof telefone === "undefined";
      if (!telefoneValido)
        return response
          .status(400)
          .send({ message: "O campo telefone precisa ser do tipo string." });

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
}

module.exports = new UsuarioController();
