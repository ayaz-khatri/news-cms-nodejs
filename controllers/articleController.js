import Category from "../models/Category.js";
import News from "../models/News.js";
import User from "../models/User.js";
import path from 'path';
import fs from 'fs';


const allArticles = async (req, res) => {
    try {
        let articles;
        if(req.role == 'admin'){
                    articles = await News.find()
                                    .populate('category', 'name')
                                    .populate('author', 'fullname');
        } else {
                        articles = await News.find({author: req.id})
                                   .populate('category', 'name')
                                   .populate('author', 'fullname');
        }
        res.render('admin/articles', {articles, role: req.role});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
 };
const addArticlePage = async (req, res) => { 
    const categories = await Category.find();
    res.render('admin/articles/create', {categories, role: req.role});
}; 
const addArticle = async (req, res) => {
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
        // res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
 };
const updateArticlePage = async (req, res) => { 
    try {
        const article = await News.findById(req.params.id)
                                    .populate('category', 'name')
                                    .populate('author', 'fullname');
        if (!article) return res.status(404).json({message: 'Article not found'});
        if(req.role == 'author'){
            if(req.id != article.author._id){
                return res.status(403).json({message: 'Access denied'});
            }
        }
        const categories = await Category.find();
        res.render('admin/articles/update', {article, categories, role: req.role});
    } catch (error) {
        res.status(500).json({message: error.message});
    } 
}; 
const updateArticle = async (req, res) => { 
    const { title, content, category } = req.body;
    try {
        const article = await News.findById(req.params.id);
        if (!article) return res.status(404).json({message: 'Article not found'});
         if(req.role == 'author'){
            if(req.id != article.author._id){
                return res.status(403).json({message: 'Access denied'});
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
        res.status(500).json({message: error.message});
    }
};
const deleteArticle = async (req, res) => {
    try {
        const article = await News.findById(req.params.id);
        if (!article) return res.status(404).json({message: 'Article not found'});
         if(req.role == 'author'){
            if(req.id != article.author._id){
                return res.status(403).json({message: 'Access denied'});
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
        res.status(500).json({message: error.message});
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