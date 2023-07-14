const { connection } = require("../database/connection");
const { STRING, DATEONLY, ENUM, DATE } = require("sequelize");

const Usuario = connection.define(
  "Usuario",
  {
    nome: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [2, 20],
      },
    },
    sobrenome: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [2, 20],
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
      type: STRING(11),
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: STRING,
      allowNull: true,
    },
    email: {
      type: STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: STRING,
      allowNull: false,
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
