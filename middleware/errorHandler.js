const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ success: false, error: errors });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Nevažeći ID' });
  }

  if (err.code === 11000) {
    return res.status(400).json({ success: false, error: 'Duplikat' });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
};

module.exports = errorHandler;