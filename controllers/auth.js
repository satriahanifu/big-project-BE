require("dotenv").config();
const { JWT_SECREET } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existCheck = await User.findOne({
      //findOne tidak jalan
      where: { username },
    });

    if (existCheck) {
      throw new Error(`user ${username} sudah terdaftar`);
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

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existCheck = await User.findOne({
      //findOne tidak jalan
      where: { username },
    });

    if (!existCheck) {
      throw new Error(`user ${username} tidak terdaftar`);
    }

    const pwdCheck = await bcrypt.compare(password, existCheck.password);

    if (!pwdCheck) {
      throw new Error("error!, password salah");
    }

    const accessToken = jwt.sign(
      {
        user: existCheck,
      },
      JWT_SECREET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      status: true,
      data: {
        token: accessToken,
        user: existCheck,
      },
    });
  } catch (err) {
    next(err);
  }
};
