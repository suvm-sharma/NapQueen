import mongoose from 'mongoose';
import { IBlogCategoryDoc } from './blogCategory.interface';

const blogCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a valid title for BlogCategoryName'],
  },
});

const BlogCategory = mongoose.model<IBlogCategoryDoc>(
  'BlogCategory',
  blogCategorySchema
);
export default BlogCategory;
