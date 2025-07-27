const LessonModel = require("../models/lesson.model");

exports.createLesson = async (req, res) => {
  try {
    const class_id = req.params.id;
    const data = { ...req.body, class_id };
    const lessonId = await LessonModel.createLesson(data);
    res
      .status(201)
      .json({ message: "Tạo buổi học thành công", lesson_id: lessonId });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo buổi học", error });
  }
};

exports.getLessonByClass = async (req, res) => {
  try {
    const class_id = req.params.id;
    const lessons = await LessonModel.getLessonsByClassId(class_id);
    res.json({ lessons });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách buổi học", error });
  }
};

exports.getLessonDetail = async (req, res) => {
  try {
    const lesson = await LessonModel.getLessonById(req.params.id);
    if (!lesson)
      return res.status(404).json({ message: "Không tìm thấy buổi học" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy chi tiết buổi học", error });
  }
};
