const { Products } = require("../models");

const uuid = require("uuid");
const Validator = require("fastest-validator");
const formValidator = new Validator();

const validationSchema = {
  name: { type: "string" },
  description: { type: "string" },
  price: { type: "number" },
  stock: { type: "number" },
  size: { type: "string" },
  image: { type: "string" },
  categoryid: { type: "string" },
};

// findAll
exports.findAll = async (req, res, next) => {
  try {
    const data = await Products.findAll({
      include: "category",
    });

    if (!data) {
      throw new Error("Gagal mengambil data Products");
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
    const data = await Products.findByPk(id, {
      include: "category",
    });

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
    const { name, description, price, stock, size, image, categoryid } = req.body;

    const validation = formValidator.validate(req.body, validationSchema);
    if (validation.length) {
      return res.status(400).json({
        status: false,
        error: validation,
      });
    }

    const data = await Products.create({
      id: uuid.v4(),
      name: name,
      description,
      price,
      stock,
      size,
      image,
      categoryid,
    });

    if (!data) {
      throw new Error("Gagal menambahkan data");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};
// update
exports.update = async (req, res, next) => {
  try {
    const { name, description, price, stock, size, image, categoryid } = req.body;
    const { id } = req.params;

    const data = await Products.update(
      {
        name: name,
        description,
        price,
        stock,
        size,
        image,
        categoryid,
      },
      {
        where: { id: id },
      }
    );

    if (!data) {
      throw new Error("Gagal melakukan update data dengan id " + id);
    }

    res.json(await Products.findByPk(id));
  } catch (error) {
    next(error);
  }
};

// delete
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Products.destroy({
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
