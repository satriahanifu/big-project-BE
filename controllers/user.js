const { User } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const Validator = require("fastest-validator");
const formValidator = new Validator();

const validationSchema = {
  username: { type: "string" },
  password: { type: "string", min: 6 },
  fullname: { type: "string" },
  email: { type: "string" },
  role: { type: "enum" },
};

// findAll
exports.findAll = async (req, res, next) => {
  try {
    const data = await User.findAll();

    if (!data) {
      throw new Error("Gagal mengambil data user");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};

// findOne
exports.findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);

    if (!data) {
      throw new Error("Gagal mengambil data dengan id " + id);
    }

    return res.json(data);
  } catch (error) {
    next(error);
  }
};
// create
exports.create = async (req, res, next) => {
  try {
    const { username, password, fullname, email, role = "customer" } = req.body;

    const validation = formValidator.compile(validationSchema);
    if (validation.length) {
      return res.status(400).json({
        status: false,
        error: validation,
      });
    }

    const data = await User.create({
      id: uuid.v4(),
      username: username,
      password: bcrypt.hashSync(password, 12),
      fullname: fullname,
      email: email,
      role: role,
    });

    if (!data) {
      throw new Error("Gagal menambahkan data");
    }

    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// update
exports.update = async (req, res, next) => {
  try {
    const { username, password, fullname, email, role } = req.body;
    const { id } = req.params;

    const data = await User.update(
      {
        username: username,
        password: bcrypt.hashSync(password, 12),
        fullname: fullname,
        email: email,
        role: role,
      },
      {
        where: { id: id },
      }
    );

    if (!data) {
      throw new Error("Gagal melakukan update data dengan id " + id);
    }

    res.json(await User.findByPk(id));
  } catch (error) {
    next(error);
  }
};

// delete
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await User.destroy({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new Error("Gagal menghapus data dengan id " + id);
    }

    res.json({
      status: true,
    });
  } catch (error) {
    next(error);
  }
};
