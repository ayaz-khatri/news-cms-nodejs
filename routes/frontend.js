import express from 'express';
const router = express.Router();
import siteController from '../controllers/siteController.js';

router.get('/', siteController.index);
router.get('/category/:slug', siteController.articleByCategory);
router.get('/single/:id', siteController.singleArticle);
router.get('/search', siteController.search);
router.get('/author/:name', siteController.author);
router.post('/single/:id', siteController.addComment);

export default router;
