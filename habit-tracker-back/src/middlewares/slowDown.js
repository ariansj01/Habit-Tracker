const slowDown = require('express-slow-down');

const slowDownMiddleware = slowDown({
    windowMs: 15 * 60 * 1000, // 15 دقیقه
    delayAfter: 50, // بعد از 50 درخواست شروع به کند کردن کن
    delayMs: () => 500, // هر درخواست بعدی 500ms تاخیر داشته باش
    maxDelayMs: 20000, // حداکثر 20 ثانیه تاخیر
    skipSuccessfulRequests: true, // درخواست‌های موفق رو نادیده بگیر
    skipFailedRequests: false, // درخواست‌های ناموفق رو هم کند کن
});

module.exports = slowDownMiddleware;
