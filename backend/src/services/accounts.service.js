const ApiError = require("../utils/ApiError");
const pool = require("../config/db");

async function verifyLogin({ username, password }) {
  // Lấy tài khoản từ cơ sở dữ liệu
  const [rows] = await pool.query("SELECT * FROM Accounts WHERE username = ? LIMIT 1", [username]);
  const acc = rows[0];

  // Kiểm tra nếu tài khoản không tồn tại
  if (!acc) throw new ApiError(401, "Invalid username or password");

  // Kiểm tra trạng thái tài khoản
  if (acc.status !== "ACTIVE") throw new ApiError(403, `Account is ${acc.status}`);

  // So sánh mật khẩu trực tiếp với mật khẩu trong cơ sở dữ liệu
  if (password !== acc.password) {
    throw new ApiError(401, "Invalid username or password");
  }

  // Cập nhật thời gian đăng nhập
  const now = new Date();
  await pool.query("UPDATE Accounts SET lastLoginAt = ?, updated_at = ? WHERE id = ?", [now, now, acc.id]);

  // Trả về thông tin người dùng
  return {
    id: acc.id,
    username: acc.username,
    employeeId: acc.employeeId,
    role: acc.role
  };
}

module.exports.verifyLogin = verifyLogin;
