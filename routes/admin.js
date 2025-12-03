import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import categoryController from '../controllers/categoryController.js';
import articleController from '../controllers/articleController.js';
import commentController from '../controllers/commentController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';
import isAdmin from '../middleware/isAdmin.js';
import upload from '../middleware/multer.js';
import isValid from '../middleware/validation.js';
import redirectIfLoggedIn from '../middleware/redirectIfLoggedIn.js';

// Login Routes
router.get('/', redirectIfLoggedIn,userController.loginPage);
router.post('/index', isValid.loginValidation, userController.adminLogin);
router.get('/logout', userController.logout);
router.get('/dashboard', isLoggedIn, userController.dashboard);
router.get('/settings', isLoggedIn, isAdmin, userController.settings);
router.post('/settings/save', isLoggedIn, isAdmin, upload.single('logo'), userController.saveSettings);

// User CRUD Routes
router.get('/users', isLoggedIn, isAdmin, userController.allUsers);
router.get('/users/add', isLoggedIn, isAdmin, userController.addUserPage);
router.post('/users/add', isLoggedIn, isAdmin, isValid.userValidation, userController.addUser);
router.get('/users/update/:id', isLoggedIn, isAdmin, userController.updateUserPage);
router.post('/users/update/:id', isLoggedIn, isAdmin, isValid.userUpdateValidation, userController.updateUser);
router.delete('/users/delete/:id', isLoggedIn, isAdmin, userController.deleteUser);


// Category CRUD Routes
router.get('/categories', isLoggedIn, isAdmin, categoryController.allCategories);
router.get('/categories/add', isLoggedIn, isAdmin, categoryController.addCategoryPage);
router.post('/categories/add', isLoggedIn, isAdmin, isValid.categoryValidation, categoryController.addCategory);
router.get('/categories/update/:id', isLoggedIn, isAdmin, categoryController.updateCategoryPage);
router.post('/categories/update/:id', isLoggedIn, isAdmin, isValid.categoryValidation, categoryController.updateCategory);
router.delete('/categories/delete/:id', isLoggedIn, isAdmin, categoryController.deleteCategory);


// Article CRUD Routes
router.get('/articles', isLoggedIn, articleController.allArticles);
router.get('/articles/add', isLoggedIn, articleController.addArticlePage);
router.post('/articles/add', isLoggedIn, upload.single('image'), isValid.articleValidation, articleController.addArticle);
router.get('/articles/update/:id', isLoggedIn, articleController.updateArticlePage);
router.post('/articles/update/:id', isLoggedIn, upload.single('image'), isValid.articleValidation, articleController.updateArticle);
router.delete('/articles/delete/:id', isLoggedIn, articleController.deleteArticle);

// Comment Routes
router.get('/comments', isLoggedIn, commentController.allComments);
router.put('/comments/update/:id', isLoggedIn, commentController.updateComment);
router.delete('/comments/delete/:id', isLoggedIn, commentController.deleteComment);

// 404 Middleware
router.use(isLoggedIn, (req, res, next) => {
    res.status(404).render('admin/404',{
        message: 'Page Not Found',
        role: req.role
    });
});


// Error Handling Middleware
router.use(isLoggedIn,(err, req, res, next) => {
    console.log(err.stack);
    const status = err.status || 500;
    res.status(status).render('admin/error',{
        status: status,
        message: err.message || 'Something went wrong!',
        role: req.role
    });
});

export default router;
