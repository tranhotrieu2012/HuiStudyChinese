const SubmissionModel = require("../models/submission.model");

exports.submitHomework = async (req, res) => {
  try {
    const homework_id = req.params.id;
    const { student_id, file_url } = req.body;
    const submissionId = await SubmissionModel.submitHomework({
      homework_id,
      student_id,
      file_url,
    });

    res
      .status(201)
      .json({ message: "Nộp bài thành công", submission_id: submissionId });
  } catch (error) {
    console.error("❌ Lỗi nộp bài:", error);
    res.status(500).json({ message: "Lỗi nộp bài", error });
  }
};
exports.getSubmission = async (req, res) => {
  try {
    const homework_id = req.params.id;

    const submissions = await SubmissionModel.getSubmissionByHomework(
      homework_id
    );
    res.json({ submissions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi không lấy danh sách nộp bài", error });
  }
};
exports.gradeSubmission = async (req, res) => {
  try {
    const submission_id = req.params.id;
    const {grade, feedback} = req.body;
    const result = await SubmissionModel.gradeSubmission(
      submission_id,
      grade,
      feedback
    );
    if (result === 0) {
      res.status(404).json({ message: "Không tìm thấy bài nộp" });
    }
    res.status(201).json({ message: "Chấm điểm thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi chấm điểm", error });
  }
};
