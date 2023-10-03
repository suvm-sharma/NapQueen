import express, { Router } from 'express';
import { blogCategoryController } from '../blogCategory/index';

const router: Router = express.Router();

router.route('/').post(blogCategoryController.createBlogCategory).get(blogCategoryController.getBlogCategory);
router
  .route('/:id')
  .get(blogCategoryController.getBlogCategoryById)
  .delete(blogCategoryController.deleteBlogCategory)
  .put(blogCategoryController.updateBlogCategory);

export default router;
