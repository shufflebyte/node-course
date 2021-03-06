const express = require('express');
require('./db/mongoose');

const { Router } = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
// PORT needed for heroku
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
