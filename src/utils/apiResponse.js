function formatResponse(res, statusCode, message, data) {
  try {
    return res.status(statusCode).json({
      apiRes: message,
      message,
      data,
    });
  } catch (error) {
    return res.status(statusCode).json({
      apiRes: message,
      message: error.message,
      data,
    });
  }
}

module.exports = { formatResponse };
