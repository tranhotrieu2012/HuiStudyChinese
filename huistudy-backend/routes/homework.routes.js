const express = require("express");
const router = express.Router();
const homeworkController = require("../controllers/homework.controller");
const submissionController = require("../controllers/submission.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// Giao bài tập giáo viên
router.post(
  "/lessons/:id/homeworks",
  verifyToken,
  homeworkController.createHomework
);
// Danh sách bài tập buổi học
router.get(
  "/lessons/:id/homeworks",
  verifyToken,
  homeworkController.getLessonHomeworks
);
// Học viên nộp bài
router.post(
  "/homeworks/:id/submit",
  verifyToken,
  submissionController.submitHomework
);

// Xem danh sách bài tập
router.get(
  "/homeworks/:id/submissions",
  verifyToken,
  submissionController.getSubmission
);

// Giao vien chấm bài
router.put(
  "/submissions/:id/grade",
  verifyToken,
  submissionController.gradeSubmission
);

module.exports = router;
