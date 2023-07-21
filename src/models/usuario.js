const { connection } = require("../database/connection");
const { INTEGER, STRING, DATEONLY, ENUM, DATE } = require("sequelize");

const Usuario = connection.define(
  "usuario",
  {
    identificador: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 20],
          msg: "O campo nome deve ter no mínimo 2 caracteres e no máximo 20.",
        },
      },
    },
    sobrenome: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 20],
          msg: "O campo sobrenome deve ter no mínimo 2 caracteres e no máximo 20.",
        },
      },
    },
    genero: {
      type: STRING,
      allowNull: true,
    },
    dataNascimento: {
      type: DATEONLY,
      allowNull: false,
    },
    cpf: {
      type: STRING,
      allowNull: false,
      unique: { msg: "CPF já cadastrado." },
      validate: {
        len: { args: [11, 11], msg: "O campo CPF deve ter 11 dígitos." },
      },
    },
    telefone: {
      type: STRING,
      allowNull: true,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: { msg: "Email já cadastrado." },
      validate: {
        isEmail: { msg: "Email inválido." },
      },
    },
    senha: {
      type: STRING,
      allowNull: false,
      validate: {
        is: {
          args: /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}/,
          msg: "A senha deve ter no mínimo 8 caracteres, sendo pelo menos 1 letra maiúscula, 1 número e 1 caractere especial.",
        },
      },
    },
    status: {
      type: ENUM("Ativo", "Inativo"),
      allowNull: false,
      defaultValue: "Ativo",
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
  },
  { underscored: true, paranoid: true }
);

module.exports = { Usuario };
