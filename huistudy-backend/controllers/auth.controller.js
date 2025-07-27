const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthModel = require("../models/auth.model");
const { sendResetEmail } = require("../utils/mail.util");

// --------------- Register ---------------
exports.register = async (req, res) => {
  const { email, password, full_name, role } = req.body;
  try {
    const existing = await AuthModel.findUserByEmail(email);
    if (existing) return res.status(400).json({ message: "Email đã tồn tại" });

    const hash = await bcrypt.hash(password, 10);
    const user_id = await AuthModel.createUser({
      email,
      password_hash: hash,
      full_name,
    });

    const role_id = await AuthModel.getRoleByName(role);
    if (!role_id)
      return res.status(400).json({ message: "Vai trò không hợp lệ" });

    await AuthModel.assignUserRole(user_id, role_id);

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error });
  }
};

// --------------- Login ---------------
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthModel.findUserByEmail(email);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: "Sai mật khẩu" });

    const token = jwt.sign(
      { user_id: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, full_name: user.full_name },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error });
  }
};
// --------------- Get me ---------------
exports.getMe = async (req, res) => {
  try {
    const user = await AuthModel.getUserById(req.user.user_id);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error });
  }
};

// --------------- Forgot password ---------------
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await AuthModel.findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "Email không tồn tại." });

    const token = await AuthModel.createPasswordResetToken(user.id);
    await sendResetEmail(email, token);

    res.json({ message: "Đã gửi email không phục mật khẩu." });
  } catch (error) {
    console.error("[ForgotPassword Error]", error); // 👈 log ra terminal
    res.status(500).json({ message: "Lỗi server ", error: error });
  }
};

// --------------- Reset password ---------------
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const record = await AuthModel.verifyResetToken(token);
    if (!record)
      return res.status(400).json({ message: "Token không hợp lệ." });

    const hash = await bcrypt.hash(newPassword, 10);
    await AuthModel.updateUserPassword(record.user_id, hash);
    await AuthModel.markResetUsed(record.id);

    res.json({ message: "Đặt lại mật khẩu thành công." });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server ", error: error });
  }
};
