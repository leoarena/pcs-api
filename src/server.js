const express = require("express");
const cors = require("cors");
const { connection } = require("./database/connection");
const routes = require("./routes");

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.initializeServer(server);
    this.database();
    this.routes(server);
  }

  async middlewares(app) {
    app.use(cors());
    app.use(express.json());
  }

  async initializeServer(app) {
    const port = 3333;
    app.listen(port, () =>
      console.log(`Servidor executando na porta ${port}.`)
    );
  }

  async database() {
    try {
      await connection.authenticate();
      console.log("Conexão bem sucedida.");
    } catch (error) {
      console.log("Não foi possível se conectar ao banco de dados.", error);
    }
  }

  async routes(app) {
    app.use(routes);
  }
}

module.exports = { Server };
