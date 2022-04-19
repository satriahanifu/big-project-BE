var express = require("express");
var router = express.Router();

const addressController = require("../controllers/address");

router.get("/", addressController.findAll);
router.get("/:id", addressController.findOne);
router.post("/", addressController.create);
router.delete("/:id", addressController.delete);
router.put("/:id", addressController.update);

module.exports = router;
