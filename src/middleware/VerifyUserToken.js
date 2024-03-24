import jwt from "jsonwebtoken";

function VerfifyUserToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Falha ao autenticar o token" });
    }

    req.user = decodedToken;
    next();
  });
}

export default VerfifyUserToken;
