const express = require("express");
const router = express.Router();

const userCtrl = require("../../controllers/users.controller");

router.get("/", userCtrl.findAll);
router.post("/", userCtrl.create);
router.get("/:id", userCtrl.findById);
router.post("/find", userCtrl.findOne);
/*router.put("/:id", userCtrl.update);
router.delete("/:id", userCtrl.delete);*/

module.exports = router;
