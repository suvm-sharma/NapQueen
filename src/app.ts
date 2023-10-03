import express, { Express } from 'express';
import blogRouter from './modules/router/blogRouter';
import blogCategoryRouter from './modules/router/blogCategoryRouter';
import httpStatus from 'http-status';
import { ApiError } from './modules/errors';

const app: Express = express();

app.use(express.json());
app.use('/api/posts', blogRouter);
app.use('/api/blogCategory', blogCategoryRouter);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Unknown API Request'));
});

export default app;
