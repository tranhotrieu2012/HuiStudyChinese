const express = require("express");
const router = express.Router();
const classController = require("../controllers/class.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, classController.createClass);
router.get("/", classController.getAllClasses);
router.get("/:id", classController.getClassDetail);
router.post("/:id/join", verifyToken, classController.joinClass);

module.exports = router;
