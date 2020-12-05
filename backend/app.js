import rateLimit from 'express-rate-limit';
import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';

import publicRoutes from './src/routes/public';
import apiRoutes from './src/routes/api';
import apiMiddleware from './src/middleware/apiAuth';
import errorHandler from './src/middleware/errorHandler';

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
});

app.use(cors());
app.use(bodyParser.json());
app.use('/', publicRoutes);
app.use('/api', [apiMiddleware, apiLimiter], apiRoutes);
app.use(errorHandler);

module.exports = app;
