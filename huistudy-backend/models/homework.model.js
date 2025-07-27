const db = require("../config/db");

const HomeworkModel = {
  createHomework: async ({ lesson_id, title, description, due_date }) => {
    const [result] = await db.execute(
      `INSERT INTO homeworks (lesson_id, title, description, due_date) VALUES (?, ?, ?, ?)`,
      [lesson_id, title, description, due_date]
    );

    return result.insertId;
  },
  getHomeworkByLesson: async (lesson_id) => {
    const [rows] = await db.execute(
      "SELECT * FROM homeworks WHERE lesson_id = ? ORDER BY due_date ASC",
      [lesson_id]
    );
    return rows;
  },
  getHomeworkById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM homeworks WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },
};
module.exports = HomeworkModel;
