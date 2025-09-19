// Global error handler
const errorHandler = (err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    });
};

// 404 handler
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl
    });
};

module.exports = {
    errorHandler,
    notFoundHandler
};
