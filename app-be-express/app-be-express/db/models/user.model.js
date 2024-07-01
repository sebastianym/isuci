const { DataTypes, Sequelize, Model } = require("sequelize");
const { ACCOUNT_TABLE } = require("../models/account.model");

const USER_TABLE = "users";

const UserSchema = {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.literal("gen_random_uuid()"),
  },
  fullName: {
    field: "full_name",
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  accountId: {
    field: "account_id",
    type: DataTypes.UUID,
    references: {
      model: ACCOUNT_TABLE,
      key: "id",
    },
  },
  cedula:{
    field: "cedula",
    type: DataTypes.STRING,
  },
  genero:{
    field: "genero",
    type: DataTypes.STRING,
  },
  experiencia:{
    field: "experiencia",
    type: DataTypes.INTEGER,
  },
  nacionalidad:{
    field: "nacionalidad",
    type: DataTypes.STRING,
  },
  especialidad:{
    field: "especialidad",
    type: DataTypes.STRING,
  },
  contextura:{
    field: "contextura",
    type: DataTypes.STRING,
  }
  
};

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Account, { as: "account" });
    this.hasMany(models.Post, {
      as: "posts",
      foreignKey: "userId",
    });
    this.hasMany(models.Interaction, {
      as: "likes",
      foreignKey: "userId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User,
};
