import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import categoryController from '../controllers/categoryController.js';
import articleController from '../controllers/articleController.js';
import commentController from '../controllers/commentController.js';

// Login Routes
router.get('/', userController.loginPage);
router.post('/index', userController.adminLogin);
router.get('/logout', userController.logout);
router.get('/dashboard', userController.dashboard);
router.get('/settings', userController.settings);

// User CRUD Routes
router.get('/users', userController.allUsers);
router.get('/users/add', userController.addUserPage);
router.post('/users/add', userController.addUser);
router.get('/users/update/:id', userController.updateUserPage);
router.post('/users/update/:id', userController.updateUser);
router.delete('/users/delete/:id', userController.deleteUser);


// Category CRUD Routes
router.get('/categories', categoryController.allCategories);
router.get('/categories/add', categoryController.addCategoryPage);
router.post('/categories/add', categoryController.addCategory);
router.get('/categories/update/:id', categoryController.updateCategoryPage);
router.post('/categories/update/:id', categoryController.updateCategory);
router.delete('/categories/delete/:id', categoryController.deleteCategory);


// Article CRUD Routes
router.get('/articles', articleController.allArticles);
router.get('/articles/add', articleController.addArticlePage);
router.post('/articles/add', articleController.addArticle);
router.get('/articles/update/:id', articleController.updateArticlePage);
router.post('/articles/update/:id', articleController.updateArticle);
router.delete('/articles/delete/:id', articleController.deleteArticle);

// Comment Routes
router.get('/comments', commentController.allComments);

export default router;
