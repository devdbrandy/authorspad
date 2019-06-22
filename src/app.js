import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import ExceptionHandler from '@helpers/exceptionHandler';
import { messages } from '@helpers/constants';
import routes from './routes';

const { NOT_FOUND } = messages;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// register routes
routes(app);

// catch 404 and forward to exception handler
app.use((request, response, next) => {
  next(ExceptionHandler.throwHttpError(404, NOT_FOUND));
});

// exception handler
app.use(ExceptionHandler.handleError());

export default app;
