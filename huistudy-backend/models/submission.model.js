const db = require("../config/db");

const SubmissionModel = {
  submitHomework: async ({ homework_id, student_id, file_url }) => {
    const [result] = await db.execute(
      `INSERT INTO submissions (homework_id, student_id, file_url) VALUES (?, ?, ?)`,
      [homework_id, student_id, file_url]
    );
    return result.insertId;
  },
  getSubmissionByHomework: async (homework_id) => {
    const [rows] = await db.execute(
      "SELECT s.*, u.full_name FROM submissions s JOIN users u ON s.student_id = u.id WHERE homework_id = ?",
      [homework_id]
    );
    return rows;
  },
  gradeSubmission: async (submission_id, grade, feedback) => {
    const [result] = await db.execute(
      "UPDATE submissions SET grade = ?, feedback = ? WHERE id = ?",
      [grade, feedback, submission_id]
    );
    return result.affectedRows;
  },
};

module.exports = SubmissionModel;
