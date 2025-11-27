import mongoose from "mongoose";
import Category from "../models/Category.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import News from "../models/News.js";
// import errorMessage from "../utils/error-message.js";


const index = async (req, res) => { 
    try{
        const news = await News.find()
                                .populate('category', {'name':1, 'slug':1})
                                .populate('author', 'fullname')
                                .sort({timestamps: -1});

        const categoriesInUse = await News.distinct('category');
        const categories = await Category.find({'_id': {'$in': categoriesInUse}});
        res.render('index', {news, categories});
    } catch (error) {
        // next( errorMessage(error.message, 500) );
        console.log(error);
    }
};
const articleByCategory = async (req, res) => {
    try{
        const category = await Category.findOne({slug: req.params.slug});
        if(!category) return res.status(404).send('Category not found.');
        const news = await News.find({category: category._id})
                                .populate('category', {'name':1, 'slug':1})
                                .populate('author', 'fullname')
                                .sort({timestamps: -1});

        const categoriesInUse = await News.distinct('category');
        const categories = await Category.find({'_id': {'$in': categoriesInUse}});
        res.render('category', {news, categories});
    } catch (error) {
        // next( errorMessage(error.message, 500) );
        console.log(error);
    }
 };
const singleArticle = async (req, res) => { 
    try{
        const singleNews = await News.findById(req.params.id)
                                .populate('category', {'name':1, 'slug':1})
                                .populate('author', 'fullname')
                                .sort({timestamps: -1});

        const categoriesInUse = await News.distinct('category');
        const categories = await Category.find({'_id': {'$in': categoriesInUse}});
        res.render('single', {singleNews, categories});
    } catch (error) {
        // next( errorMessage(error.message, 500) );
        console.log(error);
    }
};
const search = async (req, res) => { 
    try{
        const news = await News.find()
                                .populate('category', {'name':1, 'slug':1})
                                .populate('author', 'fullname')
                                .sort({timestamps: -1});

        const categoriesInUse = await News.distinct('category');
        const categories = await Category.find({'_id': {'$in': categoriesInUse}});
        res.render('search', {news, categories});
    } catch (error) {
        // next( errorMessage(error.message, 500) );
        console.log(error);
    }
};
const author = async (req, res) => { 
    try{
        const news = await News.find({author: req.params.id})
                                .populate('category', {'name':1, 'slug':1})
                                .populate('author', 'fullname')
                                .sort({timestamps: -1});

        const categoriesInUse = await News.distinct('category');
        const categories = await Category.find({'_id': {'$in': categoriesInUse}});
        res.render('author', {news, categories});
    } catch (error) {
        // next( errorMessage(error.message, 500) );
        console.log(error);
    }
};
const addComment = async (req, res) => { };

export default {
    index,
    articleByCategory,
    singleArticle,
    search,
    author,
    addComment
};