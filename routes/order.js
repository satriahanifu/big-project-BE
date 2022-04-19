var express = require("express");
var router = express.Router();

// const { findAll, findOne, create, update, delete: remove } = require("../controllers/categories");
const orderController = require("../controllers/order");

/* GET users listing. */
router.get("/", orderController.findAll);
router.get("/:id", orderController.findOne);
router.post("/", orderController.create);
router.delete("/:id", orderController.delete);
router.put("/:id", orderController.update);

module.exports = router;
