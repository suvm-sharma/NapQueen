import express from 'express';
import { IBlog, IBlogDoc, updateBlogBody } from './blog.interface';
import Blog from './blog.model';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { ApiError } from '../errors';

export const createBlog = async (createBlog: IBlog): Promise<IBlogDoc> => {
  return await Blog.create(createBlog);
};

export const getAllBlog = async (): Promise<IBlogDoc[]> => {
  return await Blog.find();
};

export const getBlogById = async (blogId: mongoose.Types.ObjectId): Promise<IBlogDoc | null> => {
  return await Blog.findById(blogId);
};

export const updateBlog = async (blogId: mongoose.Types.ObjectId, updateBody: updateBlogBody): Promise<IBlogDoc | null> => {
  const blog = await getBlogById(blogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not Found');
  }
  Object.assign(blog, updateBody);
  await blog.save();
  return blog;
};

export const deleteBlog = async (BlogId: mongoose.Types.ObjectId): Promise<IBlogDoc | null> => {
  const blog = await getBlogById(BlogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  await blog.deleteOne();
  return blog;
};

export const getLatestBlog = async (): Promise<IBlogDoc[]> => {
  let ans1 = await Blog.aggregate([
    {
      $sort: { createdAt: -1 }, // Sort posts by created_at in descending order
    },
    {
      $group: {
        _id: '$categoryId', // Group by categoryId
        latestPost: { $first: '$$ROOT' }, // Get the first (latest) post in each categoryId
      },
    },
    {
      $replaceRoot: { newRoot: '$latestPost' }, // Replace the document root with the latest post
    },
  ]);
  return ans1;
};
