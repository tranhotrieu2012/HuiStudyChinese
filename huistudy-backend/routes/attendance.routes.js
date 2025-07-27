const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendances.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// Giao viên điểm danh
router.post(
  "/lessons/:id/attendance",
  verifyToken,
  attendanceController.markAttendance
);

// Xem danh sách điểm danh
router.get(
  "/lessons/:id/attendance",
  verifyToken,
  attendanceController.getAttendanceList
);

module.exports = router;
