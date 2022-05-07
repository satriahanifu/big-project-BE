require("dotenv").config();
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existCheck = await User.findone({
      where: { username },
    });

    if (!existCheck) {
      throw new Error(`User ${username} sudah digunakan`);
    }

    const data = await User.create({
      id: uuid.v4(),
      username: username,
      password: bcrypt.hashSync(password, 12),
    });

    if (!data) {
      throw new Error("gagal registrasi user baru");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};
