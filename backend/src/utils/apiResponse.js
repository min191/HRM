// src/utils/apiResponse.js
function ok(res, data = null, message = "OK") {
  return res.json({ success: true, message, data });
}

function created(res, data = null, message = "CREATED") {
  return res.status(201).json({ success: true, message, data });
}

function fail(res, status = 400, message = "BAD_REQUEST", details = null) {
  return res.status(status).json({ success: false, message, details });
}

module.exports = { ok, created, fail };