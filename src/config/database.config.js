const { config } = require("dotenv");
config();

const { DIALECT, HOST, USERNAMEDB, PASSWORDDB, DATABASE, PORT, SECRET } =
  process.env;

module.exports = {
  dialect: DIALECT,
  host: HOST,
  username: USERNAMEDB,
  password: PASSWORDDB,
  database: DATABASE,
  port: PORT,
  secret: SECRET,
  define: {
    underscored: true,
    underscoredAll: true,
  },
};
