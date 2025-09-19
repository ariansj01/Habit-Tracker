const morgan = require('morgan');

const loggingMiddleware = morgan('combined', {
    skip: (req, res) => res.statusCode < 400, // فقط خطاها رو log کن
    stream: {
        write: (message) => {
            console.log(message.trim());
        }
    }
});

module.exports = loggingMiddleware;
