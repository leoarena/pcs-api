const { connection } = require("../database/connection");
const { INTEGER, STRING, ENUM, DECIMAL, DATE } = require("sequelize");

const Medicamento = connection.define(
  "medicamento",
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
    depositoId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: "depositos",
        key: "identificador",
      },
    },
    nomeMedicamento: {
      type: STRING,
      allowNull: false,
    },
    nomeLaboratorio: {
      type: STRING,
      allowNull: false,
    },
    descricao: {
      type: STRING,
      allowNull: true,
    },
    dosagem: {
      type: INTEGER,
      allowNull: false,
    },
    unidadeDosagem: {
      type: ENUM("mg", "mcg", "g", "mL", "%", "Outro"),
      allowNull: false,
    },
    tipo: {
      type: ENUM("Medicamento Controlado", "Medicamento Não Controlado"),
      allowNull: false,
    },
    precoUnitario: {
      type: DECIMAL(10, 2),
      allowNull: false,
    },
    quantidade: {
      type: INTEGER,
      allowNull: false,
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

module.exports = { Medicamento };
