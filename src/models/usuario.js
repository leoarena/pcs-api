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
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [11, 11],
      },
    },
    telefone: {
      type: STRING,
      allowNull: true,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
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
