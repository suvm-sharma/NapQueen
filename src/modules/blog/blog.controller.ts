import { Express, Request, Response } from 'express';
import { catchAsync } from '../utils';
import Blog from './blog.model';
import * as blogService from './blog.service';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { ApiError } from '../errors';

export const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await blogService.createBlog(req.body);
  res.send(blog);
});

export const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const blogs = await blogService.getAllBlog();
  res.send(blogs);
});

export const getBlogById = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['blogId'] === 'string') {
    const blog = await blogService.getBlogById(new mongoose.Types.ObjectId(req.params['blogId']));

    if (!blog) {
      throw (httpStatus.NOT_FOUND, 'Blog not Found');
    }
  }
});

export const updateBlog = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['blogId'] === 'string') {
    const blog = await blogService.updateBlog(new mongoose.Types.ObjectId(req.params['blogId']), req.body);

    if (!blog) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Blog not Found');
    }
    res.send(blog);
  }
});

export const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['blogId'] === 'string') {
    const blog = await blogService.deleteBlog(new mongoose.Types.ObjectId(req.params['menuId']));

    if (!blog) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Blog not Found');
    }
  }
  res.status(httpStatus.NO_CONTENT).send();
});

export const getLatestBlog = catchAsync(async (req: Request, res: Response) => {
  const latestBlog = await blogService.getLatestBlog();
  res.send(latestBlog);
});
