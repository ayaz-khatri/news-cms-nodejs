import Category from "../models/Category.js";
import News from "../models/News.js";
import User from "../models/User.js";


const allArticles = async (req, res) => {
    res.render('admin/articles', {role: req.role});
 };
const addArticlePage = async (req, res) => { 
    res.render('admin/articles/create', {role: req.role});
}; 
const addArticle = async (req, res) => { };
const updateArticlePage = async (req, res) => { 
    res.render('admin/articles/update', {role: req.role});
}; 
const updateArticle = async (req, res) => { };
const deleteArticle = async (req, res) => { };


export default {
    allArticles,
    addArticlePage,
    addArticle,
    updateArticlePage,  
    updateArticle,
    deleteArticle
}