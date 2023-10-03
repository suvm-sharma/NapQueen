import mongoose from 'mongoose';
import { IBlogDoc } from './blog.interface';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a valid title for Blog'],
    },
    content: {
      type: String,
      required: [true, 'Please enter a valid content for Blog'],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogCategory',
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model<IBlogDoc>('Blog', blogSchema);
export default Blog;
