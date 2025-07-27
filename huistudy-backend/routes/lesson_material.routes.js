const express = require("express");
const router = express.Router();
const materialController = require("../controllers/lesson_material.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

//Tài liệu của buổi học
router.post(
  "/lessons/:id/materials",
  verifyToken,
  materialController.addMaterial
);
router.get("/lessons/:id/materials", materialController.getMaterials);

module.exports = router;
