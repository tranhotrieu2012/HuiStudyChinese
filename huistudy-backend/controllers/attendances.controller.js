const AttendanceModel = require("../models/attendance.model");

exports.markAttendance = async (req, res) => {
  try {
    const lesson_id = req.params.id;
    const { class_id, user_id, status } = req.body;
    console.log(lesson_id);
    const attendanceId = await AttendanceModel.markAttendance({
      class_id,
      lesson_id,
      user_id,
      status,
    });
    res
      .status(201)
      .json({ message: "Điểm danh thành công", attendance_id: attendanceId });
  } catch (error) {
    res.status(500).json({ message: "Lỗi điểm danh", error: error });
  }
};
exports.getAttendanceList = async (req, res) => {
  try {
    const lesson_id = req.params.id;
    const records = await AttendanceModel.getAttendanceByLesson(lesson_id);
    res.json({ attendances: records });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách điểm danh", error: error });
  }
};
