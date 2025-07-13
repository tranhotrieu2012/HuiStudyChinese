const ClassModel = require("../models/class.model");

exports.createClass = async (req, res) => {
  try {
    const teacher_id = req.user.user_id; //Lấy từ JWT
    const classId = await ClassModel.createClass({ ...req.body, teacher_id });
    res.status(201).json({ message: "Tạo lớp thành công", class_id: classId });
  } catch (err) {
    res.status(500).json({ message: "Lỗi tạo lớp học", error: err });
  }
};
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await ClassModel.getAllClasses();
    res.json({ classes });
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy danh sách lớp học", error: err });
  }
};

exports.getClassDetail = async (req, res) => {
  try {
    const classInfo = await ClassModel.getClassById(req.params.id);
    if (!classInfo)
      return res.status(404).json({ message: "Không tìm thấy lớp học" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy chi tiết lớp học", error: error });
  }
};

exports.joinClass = async (req, res) => {
  try {
    const student_id = req.user.user_id;
    await ClassModel.joinClass(req.params.id, student_id);
    res.json({ message: "Tham gia lớp học thành công" });
  } catch (error) {
    res.json(500).json({ message: "Lỗi tham gia lớp học", error: error });
  }
};
