const { User } = require("./controllers/user");
require("dotenv").config();
const { JWT_SECREET } = process.env;
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const auth = req.header("Auhtorization");

    if (!Authorization) {
      throw new Error("Unauthorized");
    }

    const token = auhtorization.split("Bearer ")[1];

    if (!token) {
      throw new Error("unauthorized");
    }

    const user = User.findByPk(verifyToken.user_id);

    if (!user) {
      throw new Error("unauhtorized");
    }
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({
      error: err.message,
    });
  }
};
