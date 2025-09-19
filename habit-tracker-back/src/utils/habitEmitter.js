const listeners = {}

function subscribe(event,fn) {
    if (!listeners[event]) listeners[event] = []
    listeners[event].push(fn)
}

function notify(event,data) {
    if (!listeners[event]) return
    listeners[event].forEach(fn => fn(data));
}

module.exports = {
    subscribe,
    notify
}