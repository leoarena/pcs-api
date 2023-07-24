"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("medicamentos", {
      identificador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "identificador",
        },
      },
      deposito_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "depositos",
          key: "identificador",
        },
      },
      nome_medicamento: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nome_laboratorio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dosagem: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unidade_dosagem: {
        type: Sequelize.ENUM("mg", "mcg", "g", "mL", "%", "Outro"),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM(
          "Medicamento Controlado",
          "Medicamento Não Controlado"
        ),
        allowNull: false,
      },
      preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("medicamentos");
  },
};
