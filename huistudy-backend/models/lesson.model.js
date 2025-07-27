const db = require("../config/db");

const LessonModel = {
  createLesson: async (data) => {
    const {
      class_id,
      title,
      description,
      scheduled_time,
      duration_minutes,
      video_url,
    } = data;
    const [result] = await db.execute(
      `INSERT INTO lessons (class_id, title, description, scheduled_time, duration_minutes, video_url)
      VALUES(?, ?, ?, ?, ?, ?)`,
      [
        class_id,
        title,
        description,
        scheduled_time,
        duration_minutes,
        video_url,
      ]
    );
    return result.insertId;
  },

  getLessonsByClassId: async (class_id) => {
    const [rows] = await db.execute(
      `SELECT * FROM lessons WHERE class_id = ? ORDER BY scheduled_time ASC`,
      [class_id]
    );
    return rows;
  },
  getLessonById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM lessons WHERE id = ?", [id]);
    return rows[0];
  },
};
module.exports = LessonModel; 
