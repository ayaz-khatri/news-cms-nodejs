import express from 'express';
const router = express.Router();
import siteController from '../controllers/siteController.js';
import loadCommonData from '../middleware/loadCommonData.js';
import authStatus from '../middleware/authStatus.js';

router.use(authStatus);
router.use(loadCommonData);
router.get('/', siteController.index);
router.get('/category/:slug', siteController.articleByCategory);
router.get('/single/:id', siteController.singleArticle);
router.get('/search', siteController.search);
router.get('/author/:id', siteController.author);
router.post('/single/:id/comment', siteController.addComment);


// 404 Middleware
router.use((req, res, next) => {
    res.status(404).render('404',{
        message: 'Page Not Found' 
    });
});


// Error Handling Middleware
router.use((err, req, res, next) => {
    console.log(err.stack);
    const status = err.status || 500;
    res.status(status).render('error',{
        status: status,
        message: err.message || 'Something went wrong!'
    });
});


export default router;
