import Category from "../models/Category.js";
import News from "../models/News.js";
import path from 'path';
import fs from 'fs';
import errorMessage from "../utils/error-message.js";


const allArticles = async (req, res, next) => {
    try {
        let articles;
        if(req.role == 'admin'){
            articles = await News.find().populate('category', 'name').populate('author', 'fullname');
        } else {
            articles = await News.find({author: req.id}).populate('category', 'name').populate('author', 'fullname');
        }
        res.render('admin/articles', {articles, role: req.role});
    } catch (error) {
        next( errorMessage(error.message, 500) );
    }
 };
const addArticlePage = async (req, res) => { 
    try {
        const categories = await Category.find();
        res.render('admin/articles/create', {categories, role: req.role});
    } catch (error) {
        next( errorMessage(error.message, 500) );
    }
}; 
const addArticle = async (req, res, next) => {
    const { title, content, category } = req.body;
    try {
        const article = new News({
            title,
            content,
            category,
            image: req.file ? req.file.filename : null,
            author: req.id
        });
        const saved = await article.save();
        res.redirect('/admin/articles');
    } catch (error) {
        next( errorMessage(error.message, 500) );
    }
 };
const updateArticlePage = async (req, res, next) => { 
    try {
        const article = await News.findById(req.params.id)
                                    .populate('category', 'name')
                                    .populate('author', 'fullname');
        if (!article) return next( errorMessage('Article not found.', 404) );
        if(req.role == 'author'){
            if(req.id != article.author._id){
                return next( errorMessage('Access denied.', 403) );
            }
        }
        const categories = await Category.find();
        res.render('admin/articles/update', {article, categories, role: req.role});
    } catch (error) {
        next( errorMessage(error.message, 500) );
    } 
}; 
const updateArticle = async (req, res, next) => { 
    const { title, content, category } = req.body;
    try {
        const article = await News.findById(req.params.id);
        if (!article) return next( errorMessage('Article not found.', 404) );
         if(req.role == 'author'){
            if(req.id != article.author._id){
                return next( errorMessage('Access denied.', 403) );
            }
        }
        article.title = title || article.title;
        article.content = content || article.content;
        article.category = category || article.category;
        if(req.file)
        {
            const imagePath = path.join('./public/uploads/', article.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.log('Failed to delete image:', err);
            });
        }
        article.image = req.file ? req.file.filename : article.image;
        const saved = await article.save();
        res.redirect('/admin/articles');
        // res.status(201).json(saved);
    } catch (error) {
        next( errorMessage(error.message, 500) );
    }
};
const deleteArticle = async (req, res, next) => {
    try {
        const article = await News.findById(req.params.id);
        if (!article) return next( errorMessage('Article not found.', 404) );
         if(req.role == 'author'){
            if(req.id != article.author._id){
                return next( errorMessage('Access denied.', 403) );
            }
        }
        await article.deleteOne();
        if (article.image) {
            const imagePath = path.join('./public/uploads/', article.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.log('Failed to delete image:', err);
            });
        }
        res.json({success:true});
    } catch (error) {
        next( errorMessage(error.message, 500) );
    }
 };


export default {
    allArticles,
    addArticlePage,
    addArticle,
    updateArticlePage,  
    updateArticle,
    deleteArticle
}