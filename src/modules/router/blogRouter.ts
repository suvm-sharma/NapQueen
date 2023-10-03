import express, { Router } from 'express';
import { blogController } from '../blog/index';

const router: Router = express.Router();

router.route('/latest').get(blogController.getLatestBlog);

router.route('/').post(blogController.createBlog).get(blogController.getBlogs);
router.route('/:id').get(blogController.getBlogById).delete(blogController.deleteBlog).put(blogController.updateBlog);

export default router;
