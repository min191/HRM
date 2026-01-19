// src/middlewares/validate.js
const { fail } = require("../utils/apiResponse");

function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return fail(res, 422, "VALIDATION_ERROR", result.error.flatten());
    }
    req.body = result.data;
    next();
  };
}

function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return fail(res, 422, "VALIDATION_ERROR", result.error.flatten());
    }
    req.query = result.data;
    next();
  };
}

module.exports = { validateBody, validateQuery };