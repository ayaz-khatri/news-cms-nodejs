import mongoose from "mongoose";
import Category from "../models/Category.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import News from "../models/News.js";
import Setting from "../models/Setting.js";
import paginate from "../utils/paginate.js";
// import errorMessage from "../utils/error-message.js";


const index = async (req, res) => { 
    try{
        // const news = await News.find()
        //                         .populate('category', {'name':1, 'slug':1})
        //                         .populate('author', 'fullname')
        //                         .sort({timestamps: -1});

        const paginatedNews = await paginate(
                                    News, {}, 
                                    req.query, {
                                    populate: [
                                        { path: 'category', select: 'name slug' },
                                        { path: 'author', select: 'fullname' }
                                    ],
                                    sort: { timestamps: -1 }
                                });     

        res.render('index', {paginatedNews, query: req.query});
    } catch (error) {
        // next( errorMessage(error.message, 500) );
        console.log(error);
    }
};
const articleByCategory = async (req, res) => {
    try{
        const category = await Category.findOne({slug: req.params.slug});
        if(!category) return res.status(404).send('Category not found.');
        // const news = await News.find({category: category._id})
        //                         .populate('category', {'name':1, 'slug':1})
        //                         .populate('author', 'fullname')
        //                         .sort({timestamps: -1});

        const paginatedNews = await paginate(
                                    News, {category: category._id}, 
                                    req.query, {
                                    populate: [
                                        { path: 'category', select: 'name slug' },
                                        { path: 'author', select: 'fullname' }
                                    ],
                                    sort: { timestamps: -1 }
                                });     

        res.render('category', {paginatedNews, category, query: req.query});
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

        res.render('single', {singleNews});
    } catch (error) {
        // next( errorMessage(error.message, 500) );
        console.log(error);
    }
};
const search = async (req, res) => { 
    try{
        const searchQuery = req.query.search;
        // const news = await News.find({
        //     $or: [
        //         { title: { $regex: query, $options: 'i' } },
        //         { content: { $regex: query, $options: 'i' } }
        //     ]
        // })
        // .populate('category', {'name':1, 'slug':1})
        // .populate('author', 'fullname')
        // .sort({timestamps: -1});

        const paginatedNews = await paginate(
                                    News, {
                                        $or: [
                                            { title: { $regex: searchQuery, $options: 'i' } },
                                            { content: { $regex: searchQuery, $options: 'i' } }
                                        ]
                                    }, 
                                    req.query, {
                                    populate: [
                                        { path: 'category', select: 'name slug' },
                                        { path: 'author', select: 'fullname' }
                                    ],
                                    sort: { timestamps: -1 }
                                });     

        res.render('search', {paginatedNews, searchQuery, query: req.query});
    } catch (error) {
        // next( errorMessage(error.message, 500) );
        console.log(error);
    }
};
const author = async (req, res) => { 
    try{
        const author = await User.findById(req.params.id);
        if(!author) return res.status(404).send('Author not found.');
        // const news = await News.find({author: req.params.id})
        //                         .populate('category', {'name':1, 'slug':1})
        //                         .populate('author', 'fullname')
        //                         .sort({timestamps: -1});

        const paginatedNews = await paginate(
                                    News, {author: req.params.id}, 
                                    req.query, {
                                    populate: [
                                        { path: 'category', select: 'name slug' },
                                        { path: 'author', select: 'fullname' }
                                    ],
                                    sort: { timestamps: -1 }
                                });     

        res.render('author', {paginatedNews, author, query: req.query });
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