"use strict";

const { ACCOUNT_TABLE } = require("../models/account.model");
const { USER_TABLE } = require("../models/user.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ACCOUNT_TABLE, {
      id: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.Sequelize.literal("gen_random_uuid()"),
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        field: "created_at",
        allowNull: true,
        type: "TIMESTAMP",
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        field: "updated_at",
        allowNull: true,
        type: "TIMESTAMP",
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deletedAt: {
        field: "deleted_at",
        allowNull: true,
        type: "TIMESTAMP",
      },
    });

    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.Sequelize.literal("gen_random_uuid()"),
      },
      fullName: {
        field: "full_name",
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      age: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      accountId: {
        field: "account_id",
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: ACCOUNT_TABLE,
          key: "id",
        },
      },
      cedula:{
        field: "cedula",
        type: Sequelize.DataTypes.STRING,
      },
      genero:{
        field: "genero",
        type: Sequelize.DataTypes.STRING,
      },
      experiencia:{
        field: "experiencia",
        type: Sequelize.DataTypes.INTEGER,
      },
      nacionalidad:{
        field: "nacionalidad",
        type: Sequelize.DataTypes.STRING,
      },
      especialidad:{
        field: "especialidad",
        type: Sequelize.DataTypes.STRING,
      },
      contextura:{
        field: "contextura",
        type: Sequelize.DataTypes.STRING,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(ACCOUNT_TABLE);
  },
};
