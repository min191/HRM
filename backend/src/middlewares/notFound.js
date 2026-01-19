// src/middlewares/notFound.js
module.exports = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Not Found",
    path: req.originalUrl,
  });
};