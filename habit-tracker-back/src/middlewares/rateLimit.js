const rateLimit = require("express-rate-limit");

// Production rate limiting - optimized for real-world usage
const limitation = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5000, // 5000 requests per 15 minutes (realistic for production)
    message: {
        error: 'Too many requests, please try again later',
        retryAfter: '15 minutes',
        limit: 5000,
        remaining: 0
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Skip successful requests from rate limit count
    skipSuccessfulRequests: false,
    // Skip failed requests from rate limit count  
    skipFailedRequests: false,
    // Custom key generator for more granular control
    keyGenerator: (req) => {
        return req.ip; // Rate limit per IP
    },
    // Custom handler for rate limit exceeded
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: Math.round(limitation.windowMs / 1000),
            limit: limitation.max,
            windowMs: limitation.windowMs
        });
    }
});

// Separate rate limiting for API endpoints (more lenient)
const apiLimitation = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000, // 10000 API requests per 15 minutes
    message: {
        error: 'API rate limit exceeded',
        retryAfter: '15 minutes',
        limit: 10000
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.ip;
    }
});

module.exports = {
    limitation,
    apiLimitation
};