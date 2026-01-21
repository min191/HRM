const pool = require("../config/db");
const ApiError = require("../utils/ApiError");

async function listPermissions() {
  const [rows] = await pool.query("SELECT id, code, description FROM Permissions ORDER BY code ASC");
  return rows;
}

async function getRolePermissions(role) {
  const [rows] = await pool.query(
    `SELECT p.code, p.description, COALESCE(rp.allow, FALSE) as allow
     FROM Permissions p
     LEFT JOIN RolePermissions rp
       ON rp.permissionId = p.id AND rp.role = ?
     ORDER BY p.code ASC`,
    [role]
  );
  return rows;
}

// items: [{ code: "employees:read", allow: true }, ...]
async function setRolePermissions(role, items) {
  // validate code tồn tại
  const codes = items.map(i => i.code);
  if (!codes.length) throw new ApiError(400, "items cannot be empty");

  const [permRows] = await pool.query(
    `SELECT id, code FROM Permissions WHERE code IN (${codes.map(() => "?").join(",")})`,
    codes
  );
  const map = new Map(permRows.map(r => [r.code, r.id]));
  for (const c of codes) {
    if (!map.has(c)) throw new ApiError(400, `Permission code not found: ${c}`);
  }

  const now = new Date();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    for (const it of items) {
      const permissionId = map.get(it.code);
      const allow = !!it.allow;

      await conn.query(
        `INSERT INTO RolePermissions (role, permissionId, allow, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE allow=VALUES(allow), updated_at=VALUES(updated_at)`,
        [role, permissionId, allow, now, now]
      );
    }

    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }

  return getRolePermissions(role);
}

module.exports = { listPermissions, getRolePermissions, setRolePermissions };
