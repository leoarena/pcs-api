const { verify } = require("jsonwebtoken");
const { secret } = require("../config/database.config");

async function auth(request, response, next) {
  try {
    const { authorization } = request.headers;
    request["payload"] = verify(authorization, secret);
    next();
  } catch (error) {
    return response.status(401).send({
      message: "Autenticação falhou.",
      cause: error.message,
    });
  }
}

module.exports = { auth };
