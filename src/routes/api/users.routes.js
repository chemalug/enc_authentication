const express = require("express");
const router = express.Router();

const userCtrl = require("../../controllers/users.controller");

router.get("/", userCtrl.getAll);
router.post("/", userCtrl.insert);
router.get("/:id", userCtrl.getById);
/*router.put("/:id", userCtrl.update);
router.delete("/:id", userCtrl.delete);*/

module.exports = router;
