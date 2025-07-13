const db = require("../config/db");
const crypto = require("crypto");

const AuthModel = {
  // ---------- Find user by email ----------
  findUserByEmail: async (email) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },
  // ---------- Create User ----------
  createUser: async ({ email, password_hash, full_name }) => {
    const [result] = await db.execute(
      "INSERT INTO users (email, password_hash, full_name, created_at) VALUES(?, ?, ?, NOW())",
      [email, password_hash, full_name]
    );
    return result.insertId;
  },

  //   ---------- Get role by name ----------
  getRoleByName: async (role) => {
    const [rows] = await db.execute("SELECT id FROM roles WHERE name = ?", [
      role,
    ]);
    return rows[0]?.id || null;
  },

  //   ---------- Assign user role ---------
  assignUserRole: async (user_id, role_id) => {
    await db.execute(
      "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
      [user_id, role_id]
    );
  },

  //   ---------- Get user by id ----------
  getUserById: async (user_id) => {
    const [rows] = await db.execute(
      "SELECT id, email, full_name FROM users WHERE id = ?",
      [user_id]
    );
    return rows[0];
  },
  //   ---------- Create password reset token ----------
  createPasswordResetToken: async (user_id) => {
    const token = crypto.randomBytes(32).toString("hex");
    const expires_at = new Date(Date.now() + 15 * 60 * 1000); //Hiệu lực 15 phút

    await db.execute(
      "INSERT INTO password_resets (user_id, reset_token, expires_at) VALUES (?, ?, ?)",
      [user_id, token, expires_at]
    );
    return token;
  },
  //   ---------- Verify reset token ----------
  verifyResetToken: async (token) => {
    const [rows] = await db.execute(
      "SELECT * FROM password_resets WHERE reset_token = ? AND used = FALSE AND expires_at > NOW()",
      [token]
    );
    return rows[0];
  },
  //   ---------- Mark reset used ----------
  markResetUsed: async (id) => {
    await db.execute("UPDATE password_resets SET used = TRUE WHERE id = ?", [
      id,
    ]);
  },
  //   ---------- Update user password ----------
  updateUserPassword: async (user_id, hash) => {
    await db.execute("UPDATE users SET password_hash = ? WHERE id = ?", [
      hash,
      user_id,
    ]);
  },
};

module.exports = AuthModel;
