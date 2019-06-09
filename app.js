const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ExceptionHandler = require('./support/exceptionHandler');
const routes = require('./routes');

const { MESSAGES: { NOT_FOUND } } = require('./support/constants');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Register routes
routes(app);

// catch 404 and forward to exception handler
app.use((request, response, next) => {
  next(ExceptionHandler.throwHttpError(404, NOT_FOUND));
});

// Exception handler
app.use(ExceptionHandler.handleError());

module.exports = app;
