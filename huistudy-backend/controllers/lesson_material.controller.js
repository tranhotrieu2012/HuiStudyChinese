const LessonMaterialModel = require("../models/lesson_material.model");

exports.addMaterial = async (req, res) => {
  try {
    const lesson_id = req.params.id;
    const materialId = await LessonMaterialModel.addMaterial({
      ...req.body,
      lesson_id,
    });
    res
      .status(201)
      .json({ message: "Tải tài liệu thành công", material_id: materialId });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tải tài liệu", error: error });
  }
};

exports.getMaterials = async (req, res) => {
  try {
    const materials = await LessonMaterialModel.getMaterialsByLesson(
      req.params.id
    );
    res.json({ materials });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy tài liệu", error: error });
  }
};
