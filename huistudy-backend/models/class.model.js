const db = require("../config/db");

const ClassModel = {
  createClass: async (data) => {
    const {
      title,
      description,
      teacher_id,
      start_time,
      end_time,
      video_url,
      passcode,
    } = data;
    const [result] = await db.execute(
      "INSERT INTO classes (title, description, teacher_id, start_time, end_time, video_url, passcode, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())",
      [
        title,
        description,
        teacher_id,
        start_time,
        end_time,
        video_url,
        passcode,
      ]
    );
    return result.insertId;
  },
  getAllClasses: async () => {
    const [rows] = await db.execute(
      `SELECT c.* u.full_name AS teacher_name
      FROM classes c
      JOIN users u ON c.teacher_id = u.id`
    );
    return rows;
  },

  getClassById: async (id) => {
    const [rows] = await db.execute(
      `SELECT c.*, u.full_name AS teacher_name
      FROM classes c
      JOIN users u ON c.teacher_id = u.id
      WHERE c.id = ?`,
      [id]
    );
    return rows[0];
  },

  joinClass: async (class_id, student_id) => {
    await db.execute(
      `INSERT IGNORE INTO enrollments (class_id, user_id, enrolled_at) VALUES (?, ?, NOW())`,
      [class_id, student_id]
    );
  },
};

module.exports = ClassModel;
