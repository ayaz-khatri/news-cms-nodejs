import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import categoryController from '../controllers/categoryController.js';
import articleController from '../controllers/articleController.js';
import commentController from '../controllers/commentController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';
import isAdmin from '../middleware/isAdmin.js';
import upload from '../middleware/multer.js';

// Login Routes
router.get('/', userController.loginPage);
router.post('/index', userController.adminLogin);
router.get('/logout', userController.logout);
router.get('/dashboard', isLoggedIn, userController.dashboard);
router.get('/settings', isLoggedIn, isAdmin, userController.settings);

// User CRUD Routes
router.get('/users', isLoggedIn, isAdmin, userController.allUsers);
router.get('/users/add', isLoggedIn, isAdmin, userController.addUserPage);
router.post('/users/add', isLoggedIn, isAdmin, userController.addUser);
router.get('/users/update/:id', isLoggedIn, isAdmin, userController.updateUserPage);
router.post('/users/update/:id', isLoggedIn, isAdmin, userController.updateUser);
router.delete('/users/delete/:id', isLoggedIn, isAdmin, userController.deleteUser);


// Category CRUD Routes
router.get('/categories', isLoggedIn, isAdmin, categoryController.allCategories);
router.get('/categories/add', isLoggedIn, isAdmin, categoryController.addCategoryPage);
router.post('/categories/add', isLoggedIn, isAdmin, categoryController.addCategory);
router.get('/categories/update/:id', isLoggedIn, isAdmin, categoryController.updateCategoryPage);
router.post('/categories/update/:id', isLoggedIn, isAdmin, categoryController.updateCategory);
router.delete('/categories/delete/:id', isLoggedIn, isAdmin, categoryController.deleteCategory);


// Article CRUD Routes
router.get('/articles', isLoggedIn, articleController.allArticles);
router.get('/articles/add', isLoggedIn, articleController.addArticlePage);
router.post('/articles/add', isLoggedIn, upload.single('image'), articleController.addArticle);
router.get('/articles/update/:id', isLoggedIn, articleController.updateArticlePage);
router.post('/articles/update/:id', isLoggedIn, upload.single('image'), articleController.updateArticle);
router.delete('/articles/delete/:id', isLoggedIn, articleController.deleteArticle);

// Comment Routes
router.get('/comments', isLoggedIn, commentController.allComments);

export default router;
