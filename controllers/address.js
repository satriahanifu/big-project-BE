const { Address } = require("../models");

const uuid = require("uuid");
const Validator = require("fastest-validator");
const formValidator = new Validator();

const validationSchema = {
  title: { type: "string" },
  address: { type: "text" },
  primary: { type: "boolean" },
  userId: { type: "string" },
};

exports.findAll = async (req, res, next) => {
  try {
    const data = await Address.findAll({});

    if (!data) {
      throw new Error("gagal mengambil data alamat");
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Address.findByPk(id, {
      include: "address",
    });

    if (!data) {
      throw new Error("gagal mengambil id " + id);
    }
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, address, primary, userId } = req.body;

    const Validation = formValidator.validate(req.body, validationSchema);
    if (validationSchema.length) {
      return res.status(400).json({
        status: false,
        error: Validation,
      });
    }

    const data = await Address.create({
      id: uuid.v4(),
      title: title,
      address: address,
      primary: primary,
      userId: userId,
    });

    if (!data) {
      throw new Error("gagal menambahkan data ");
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { title, address, primary } = req.body;
    const { id } = req.params;

    const data = await Address.update(
      {
        title: title,
        address: address,
        primary: primary,
      },
      { where: { id: id } }
    );

    if (!data) {
      throw new Error("gagal memperbarui data dengan id" + id);
    }
    res.json(await Address.findByPk(id));
  } catch (err) {
    next(err);
  }
};

// delete
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Address.destroy({
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
