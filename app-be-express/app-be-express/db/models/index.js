const { Account, AccountSchema } = require("./account.model");
const { User, UserSchema } = require("./user.model");

function setUpModels(sequelize) {
  Account.init(AccountSchema, Account.config(sequelize));
  User.init(UserSchema, User.config(sequelize));

  Account.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = setUpModels;