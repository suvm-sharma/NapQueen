import { Express, Request, Response } from 'express';
import { catchAsync } from '../utils';
import BlogCategory from './blogCategory.model';
import * as blogCategoryService from './blogCategory.service';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { ApiError } from '../errors';

export const createBlogCategory = catchAsync(async (req: Request, res: Response) => {
  const blogCategory = await blogCategoryService.createBlogCategory(req.body);
  res.send(blogCategory);
});

export const getBlogCategory = catchAsync(async (req: Request, res: Response) => {
  const blogCategory = await blogCategoryService.getAllBlogCategory();
  res.send(blogCategory);
});

export const getBlogCategoryById = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['blogCategoryId'] === 'string') {
    const blogCategory = await blogCategoryService.getBlogCategoryById(
      new mongoose.Types.ObjectId(req.params['blogCategoryId'])
    );

    if (!blogCategory) {
      throw (httpStatus.NOT_FOUND, 'BlogCategory not Found');
    }
  }
});

export const updateBlogCategory = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['blogCategoryId'] === 'string') {
    const blogCategory = await blogCategoryService.updateBlogCategory(
      new mongoose.Types.ObjectId(req.params['blogCategoryId']),
      req.body
    );

    if (!blogCategory) {
      throw new ApiError(httpStatus.NOT_FOUND, 'BlogCategory not Found');
    }
    res.send(blogCategory);
  }
});

export const deleteBlogCategory = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['blogCategoryId'] === 'string') {
    const blogCategory = await blogCategoryService.deleteBlogCategory(new mongoose.Types.ObjectId(req.params['menuId']));

    if (!blogCategory) {
      throw new ApiError(httpStatus.NOT_FOUND, 'BlogCategory not Found');
    }
  }
  res.status(httpStatus.NO_CONTENT).send();
});
