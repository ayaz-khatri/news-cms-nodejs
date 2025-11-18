import mongoose from "mongoose";
import Category from "../models/Category.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import News from "../models/News.js";


const index = async (req, res) => { 
    res.render('index');
};
const articleByCategory = async (req, res) => {
    res.render('category');
 };
const singleArticle = async (req, res) => { 
    res.render('single');
};
const search = async (req, res) => { 
    res.render('search');
};
const author = async (req, res) => { 
    res.render('author');
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