import config from './utils/config.js';
import express from 'express';
import cors from 'cors';
import blogRouter from './controllers/blog.controller.js';
import userRouter from './controllers/user.controller.js';
import loginRouter from './controllers/login.controller.js';
import resetRouter from './controllers/testing.js';
import middleware from './utils/middleware.js';
import logger from './utils/logger.js';
import mongoose from 'mongoose';
import 'express-async-errors';

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/api/blogs', middleware.userExtractor, blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = resetRouter
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.use(middleware.userExtractor);

export default app;
