require('dotenv').config();
const express = require('express');
const router = require('./src/routes/router');
const connectDB = require('./src/repositories/config');
const middleware = require('./src/middlewares/middleware')
const app = express()

middleware(app)
app.use('/api', router);

connectDB();

app.listen(3000 , () => {
    console.log('start in port 3000')
})