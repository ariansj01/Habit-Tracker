const EventEmitter = require('events');

const userEmitter = new EventEmitter();

const notify = (event, data) => {
    userEmitter.emit(event, data);
    console.log(`User event emitted: ${event}`, data);
};

module.exports = {
    notify,
    userEmitter
};
