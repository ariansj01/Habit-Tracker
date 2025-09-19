const rateLimit = require("express-rate-limit");

// Production rate limiting
const limitation = rateLimit({
    windowMs : 15 * 60 * 1000, // 15 minutes
    max : 1000, // Increased for better performance
    message : {
        error: 'Too many requests, please try again later',
        retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
})


module.exports = limitation