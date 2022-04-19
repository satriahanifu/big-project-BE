const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existCheck = await User.findone({
      where: { username },
    });

    if (!existCheck) {
      throw new Error(`USer ${username} sudah digunakan`);
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
      where: username,
    });

    if (!existCheck) {
      throw new Error(`user ${username} tidak terdaftar`);
    }

    const pwdCheck = await bcrypt.compare(password, existCheck.password);

    if (!pwdCheck) {
      throw new Error("error!, password salah");
    }

    return res.status(201).json({
      status: true,
      data: {
        token: accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};
