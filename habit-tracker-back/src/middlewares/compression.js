const compression = require('compression');

const compressionMiddleware = compression({
    level: 6, // سطح فشرده‌سازی (1-9)
    threshold: 1024, // فقط فایل‌های بزرگ‌تر از 1KB فشرده کن
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
});

module.exports = compressionMiddleware;
