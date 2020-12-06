import rateLimit from 'express-rate-limit';
import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';

import publicRoutes from './src/routes/public';
import apiRoutes from './src/routes/api';
import apiMiddleware from './src/middleware/apiAuth';
import { errorResponse } from './src/helpers';

dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests
  keyGenerator: req => req.headers.authorization,
  message: {
    code: 429,
    errorMessage: 'Too many requests. Please try again later',
    error: {},
    data: null,
    success: false,
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use('/', publicRoutes);
app.use('/api', [apiMiddleware, apiLimiter], apiRoutes);
app.use((err, req, res) => {
  if (err && err.message === 'validation error') {
    const messages = err.errors.map(e => e.messages);
    return errorResponse(req, res, messages.join(', '), 400, err);
  }
});
app.use((req, res, next) => {
  res.status(404).send({
    code: 404,
    errorMessage: 'Page not found',
    error: {},
    data: null,
    success: false,
  });
});
module.exports = app;
