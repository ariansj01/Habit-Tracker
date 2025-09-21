const express = require('express');
const compression = require('./compression');
const cors = require('./cors');
const errorHandler = require('./errorHandler');
const healthCheck = require('./healthCheck');
const logging = require('./logging');
const { limitation, apiLimitation } = require('./rateLimit');
const security = require('./security');
const slowDown = require('./slowDown');
const validation = require('./validation');

const middleware = (app) => {
    app.use(security) // Security headers
    app.use(compression) // Compression
    app.use(logging) // Request logging
    app.use(express.json({ limit: '10mb' })) // JSON parsing
    app.use(express.urlencoded({ extended: true, limit: '10mb' })) // Form data parsing
    app.use(cors) // CORS
    app.use(slowDown) // Slow down suspicious requests
    app.use(limitation) // General rate limiting
    app.use('/api', apiLimitation) // API-specific rate limiting
};

module.exports = middleware;