const db = require("../config/db");

const UserModel = {
  // ---------- Get user by Id ----------
  getById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },
  //   ---------- Update profile ----------
  updateProfile: async (id, data) => {
    const { full_name, avatar_url, gender, birthdate, phone, address } = data;
    await db.execute(
      "UPDATE users SET full_name = ?, phone = ?, avatar_url = ?, birthdate = ?, address = ?, gender = ?, updated_at = NOW() WHERE id = ?",
      [full_name, phone, avatar_url, birthdate, address, gender, id]
    );
  },
  //   ---------- Get all user ----------
  getAll: async () => {
    const [rows] = await db.execute("SELECT * FROM users");
    return rows;
  },
  //   ---------- Delete user by id ----------
  deleteById: async (id) => {
    await db.execute("DELETE FROM users WHERE id = ?", [id]);
  },
};
module.exports = UserModel;
