export default function errorHandler(req, res, next, err) {
  return res.json({
    message: err?.message || "unknows error",
    status: err?.status || 500,
  });
}
