import express from 'express';
import router from express.Router();
import { index, articleByCategory, singleArticle, search, author } from '../controllers/frontendController.js';

router.get('/', index);
router.get('/category/:name', articleByCategory);
router.get('/single/:id', singleArticle);
router.get('/search', search);
router.get('/author/:name', author);
router.post('/single/:id', addComment);

export default router;
