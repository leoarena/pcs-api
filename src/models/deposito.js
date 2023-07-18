const { connection } = require("../database/connection");
const { INTEGER, STRING, ENUM, DATE } = require("sequelize");

const Deposito = connection.define(
  "deposito",
  {
    identificador: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    usuarioId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "identificador",
      },
    },
    razaoSocial: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    cnpj: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    nomeFantasia: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    telefone: {
      type: STRING,
      allowNull: true,
    },
    celular: {
      type: STRING,
      allowNull: false,
    },
    cep: {
      type: STRING,
      allowNull: false,
    },
    logradouro: {
      type: STRING,
      allowNull: false,
    },
    numero: {
      type: STRING,
      allowNull: false,
    },
    bairro: {
      type: STRING,
      allowNull: false,
    },
    cidade: {
      type: STRING,
      allowNull: false,
    },
    estado: {
      type: STRING,
      allowNull: false,
    },
    complemento: {
      type: STRING,
      allowNull: true,
    },
    latitude: {
      type: STRING,
      allowNull: true,
    },
    longitude: {
      type: STRING,
      allowNull: true,
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

module.exports = { Deposito };
