const db = require("../config/db");

const AttendanceModel = {
  markAttendance: async ({ class_id, lesson_id, user_id, status }) => {
    const [result] = await db.execute(
      "INSERT INTO attendances (class_id, lesson_id, user_id, status) VALUES (?, ?, ?, ?)",
      [class_id, lesson_id, user_id, status]
    );
    return result.insertId;
  },

  getAttendanceByLesson: async (lesson_id) => {
    const [rows] = await db.execute(
      "SELECT a.* ,u.full_name, u.email FROM attendances a JOIN users u ON a.user_id = u.id WHERE a.lesson_id = ?",
      [lesson_id]
    );
    return rows;
  },
};
module.exports = AttendanceModel;
