const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth");
router.post("/login", login);
router.post("/registrasi", register);

module.exports = router;
