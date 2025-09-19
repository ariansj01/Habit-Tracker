const { subscribe } = require('./habitEmitter');

subscribe('habitCreated', (habit) => {
    console.log('📝 New habit created:', habit.title);

});

subscribe('habitUpdated', (habit) => {
    console.log('✏️ Habit updated:', habit.title, 'Status:', habit.done ? 'Done' : 'Pending');

});

subscribe('habitDeleted', (data) => {
    console.log('🗑️ Habit deleted with ID:', data.id);

});

subscribe('habitCount', (data) => {
    console.log('🔢 Habit count:', data.count);

});

subscribe('userCreated', (data) => {
    console.log('👤 User created with ID:', data.id);

});

subscribe('userUpdated', (data) => {
    console.log('👤 User updated with ID:', data.id);

});


subscribe('userDeleted', (data) => {
    console.log('👤 User deleted with ID:', data.id);

});


subscribe('userCount', (data) => {
    console.log('🔢 User count:', data.count);

});


module.exports = {
    subscribe
};
