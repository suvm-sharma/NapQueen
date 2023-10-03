import mongoose, { Model, Document } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  categoryId: mongoose.Types.ObjectId;
}

// The interface IBlogDoc extends IBlog and adds the properties that are required by mongoose, such as the _id field.
export interface IBlogDoc extends IBlog, Document {}

// Partial: means optional
export type updateBlogBody = Partial<IBlog>;
