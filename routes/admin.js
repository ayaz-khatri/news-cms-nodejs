import express from 'express';
import router from express.Router();

// Login Routes
router.get('/login', loginPage);
router.post('/index', adminLogin);
router.get('/logout', logout);

// User CRUD Routes
router.get('/users', allUsers);
router.get('/users/add', addUserPage);
router.post('/users/add', addUser);
router.get('/users/update/:id', updateUserPage);
router.post('/users/update/:id', updateUser);
router.get('/users/delete/:id', deleteUser);


// Category CRUD Routes
router.get('/categories', allcategories);
router.get('/categories/add', addCategoryPage);
router.post('/categories/add', addCategory);
router.get('/categories/update/:id', updateCategoryPage);
router.post('/categories/update/:id', updateCategory);
router.get('/categories/delete/:id', deleteCategory);


// Article CRUD Routes
router.get('/articles', allarticles);
router.get('/articles/add', addArticlePage);
router.post('/articles/add', addArticle);
router.get('/articles/update/:id', updateArticlePage);
router.post('/articles/update/:id', updateArticle);
router.get('/articles/delete/:id', deleteArticle);

// Comment Routes
router.get('/comments', allcomments);

router.get('/', index);


export default router;
