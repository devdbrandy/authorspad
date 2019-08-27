import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';

import Exception from '@helpers/exception';
import { messages } from '@helpers/constants';
import routes from './routes';

const { NOT_FOUND } = messages;
const app = express();

const isTestEnvironment = app.get('env') === 'test';

app.use(logger('dev', { skip: () => isTestEnvironment }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// register routes
routes(app);

// catch 404 and forward to exception handler
app.use((req, res, next) => {
  next(createError(404, NOT_FOUND));
});

// exception handlers
app.use(Exception.handleDatabaseError());
app.use(Exception.handleDatabaseUniqueError());
app.use(Exception.handleError());

export default app;
