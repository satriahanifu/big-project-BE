var express = require("express");
var router = express.Router();

// const { findAll, findOne, create, update, delete: remove } = require("../controllers/categories");
const categoryController = require("../controllers/categories");
// const auth = require("../authorization");

/* GET users listing. */
router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findOne);
router.post("/", categoryController.create);
router.delete("/:id", categoryController.delete);
router.put("/:id", categoryController.update);

module.exports = router;
