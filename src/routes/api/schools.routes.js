const express = require("express");
const router = express.Router();

const schoolCtrl = require("../../controllers/schools.controller");

router.get("/", schoolCtrl.findAll);
router.get("/:id", schoolCtrl.findById);
router.post("/", schoolCtrl.create);

module.exports = router;
