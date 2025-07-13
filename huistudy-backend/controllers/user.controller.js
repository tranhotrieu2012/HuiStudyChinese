const UserModel = require("../models/user.model");

// ---------- Get information by id ----------
exports.getMe = async (req, res) => {
  try {
    const user = await UserModel.getById(req.user.user_id);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error });
  }
};
// ---------- Update information ----------
exports.updateMe = async (req, res) => {
  try {
    await UserModel.updateProfile(req.user.user_id, req.body);
    res.json({ message: "Cập nhật thông tin thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error });
  }
};
// ---------- Get all users ----------
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error });
  }
};
// ---------- Delete user by id ----------
exports.deleteUser = async (req, res) => {
  try {
    await UserModel.deleteById(req.params.id);
    res.json({ message: "Đã xóa người dùng" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error });
  }
};
