const db = require("../config/db");

const LessonMaterialModel = {
  addMaterial: async (data) => {
    const { lesson_id, title, file_url, file_type } = data;
    const [result] = await db.execute(
      "INSERT INTO lesson_materials (lesson_id, title, file_url, file_type) VALUES (?, ?, ?, ?)",
      [lesson_id, title, file_url, file_type]
    );
    return result.insertId;
  },
  getMaterialsByLesson: async (lesson_id) => {
    const [rows] = await db.execute(
      "SELECT * FROM lesson_materials WHERE lesson_id = ?",
      [lesson_id]
    );
    return rows;
  },
};
module.exports = LessonMaterialModel;
