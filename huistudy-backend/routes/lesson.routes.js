const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lesson.controller");
const {verifyToken} = require("../middlewares/auth.middleware");

// Tạo buổi học cho lớp
router.post("/classes/:id/lessons", verifyToken, lessonController.createLesson);
// Lấy danh buổi học trong lớp
router.get("/classes/:id/lessons", lessonController.getLessonByClass);
// Lấy chi tiết buổi học
router.get("/classes/:lessonId", lessonController.getLessonDetail);

module.exports = router;
