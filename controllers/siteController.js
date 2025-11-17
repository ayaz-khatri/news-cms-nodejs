import mongoose from "mongoose";
import Category from "../models/Category.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import News from "../models/News.js";


const index = async (req, res) => { };
const articleByCategory = async (req, res) => { };
const singleArticle = async (req, res) => { };
const search = async (req, res) => { };
const author = async (req, res) => { };
const addComment = async (req, res) => { };

export default {
    index,
    articleByCategory,
    singleArticle,
    search,
    author,
    addComment
};