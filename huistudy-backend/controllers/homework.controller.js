const HomeworkModel = require("../models/homework.model");

exports.createHomework = async (req, res) => {
  try {
    const lesson_id = req.params.id;
    const { title, description, due_date } = req.body;

    const homeworkId = await HomeworkModel.createHomework({
      lesson_id,
      title,
      description,
      due_date,
    });

    res
      .status(201)   
      .json({ message: "Giao bài thành công", homework_id: homeworkId });
  } catch (error) {
    console.error("❌ Lỗi khi giao bài:", error);
    res.status(500).json({ message: "Lỗi giao bài", error });
  }
};


exports.getLessonHomeworks = async (req, res) => {
  try {
    const lesson_id = req.params.id;
    const homeworks = await HomeworkModel.getHomeworkByLesson(lesson_id);
    res.json({ homeworks });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy bài tập", error });
  }
};
