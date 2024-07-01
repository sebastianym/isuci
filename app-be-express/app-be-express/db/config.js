const { URI } = require("./../libs/postgres.pool");
console.log(URI)
module.exports = {
  development: {
    username: "root",
    password: "root123",
    database: "fullstack-practice",
    host: "localhost",
    dialect: "postgres"
  },
};
