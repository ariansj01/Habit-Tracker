const successResponse = (res, statusCode, data, message = 'Success') => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

const errorResponse = (res, statusCode, message = 'Error', error = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error ? error.message : null
    });
};

module.exports = {
    successResponse,
    errorResponse
};
