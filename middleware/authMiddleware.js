const response = require("../utils/response");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let accessRouter = ["/api/admin/login"];
    let path = req.originalUrl;
    if (accessRouter.includes(path)) return next();

    let token = req?.headers?.authorization?.split(" ")[1];
    if (!token) return response.unAuthorizate(res, "Token mavjud emas");
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) return response.error(res, "Yaroqsiz token");
    req.admin = verifyToken;

    next();
  } catch (err) {
    response.serverError(res, err.message);
  }
};

module.exports = authMiddleware;
