import mongoose, { Model, Document } from 'mongoose';

export interface IBlogCategory {
  name: string;
}

// The interface IBlogCategoryDoc extends IBlogCategory and adds the properties that are required by mongoose, such as the _id field.
export interface IBlogCategoryDoc extends IBlogCategory, Document {}

// Partial: means optional
export type updateBlogCategoryBody = Partial<IBlogCategory>;
