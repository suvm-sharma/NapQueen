import express from 'express';
import { IBlogCategory, IBlogCategoryDoc, updateBlogCategoryBody } from './blogCategory.interface';
import BlogCategory from './blogCategory.model';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { ApiError } from '../errors';

export const createBlogCategory = async (createBlogCategory: IBlogCategory): Promise<IBlogCategoryDoc> => {
  return await BlogCategory.create(createBlogCategory);
};

export const getAllBlogCategory = async (): Promise<IBlogCategoryDoc[]> => {
  return await BlogCategory.find();
};

export const getBlogCategoryById = async (blogId: mongoose.Types.ObjectId): Promise<IBlogCategoryDoc | null> => {
  return await BlogCategory.findById(blogId);
};

export const updateBlogCategory = async (
  blogCategoryId: mongoose.Types.ObjectId,
  updateBody: updateBlogCategoryBody
): Promise<IBlogCategoryDoc | null> => {
  const blogCategory = await getBlogCategoryById(blogCategoryId);
  if (!blogCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'BlogCategory not Found');
  }
  Object.assign(blogCategory, updateBlogCategory);
  await blogCategory.save();
  return blogCategory;
};

export const deleteBlogCategory = async (BlogCategoryId: mongoose.Types.ObjectId): Promise<IBlogCategoryDoc | null> => {
  const blogCategory = await getBlogCategoryById(BlogCategoryId);
  if (!blogCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'BlogCategory not found');
  }
  await blogCategory.deleteOne();
  return blogCategory;
};
