var express = require("express");
var router = express.Router();

const { findAll, findOne, create, update, delete: remove } = require("../controllers/address");

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", create);
router.delete("/:id", remove);
router.put("/:id", update);

module.exports = router;
