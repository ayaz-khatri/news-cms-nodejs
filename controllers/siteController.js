import Category from "../models/Category.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import News from "../models/News.js";
import paginate from "../utils/paginate.js";
import errorMessage from "../utils/error-message.js";


const index = async (req, res, next) => {
    try {
        const paginatedNews = await paginate(
                                    News, {},
                                    req.query, {
                                    populate: [
                                        { path: 'category', select: 'name slug' },
                                        { path: 'author', select: 'fullname' }
                                    ],
                                    sort: { timestamps: -1 }
                                });
        res.render('index', { paginatedNews, query: req.query });
    } catch (error) {
        next(errorMessage(error.message, 500));
    }
};


const articleByCategory = async (req, res, next) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) return next(errorMessage('Category not found', 404));
        const paginatedNews = await paginate(
            News, { category: category._id },
            req.query, {
            populate: [
                { path: 'category', select: 'name slug' },
                { path: 'author', select: 'fullname' }
            ],
            sort: { timestamps: -1 }
        });
        res.render('category', { paginatedNews, category, query: req.query });
    } catch (error) {
        next( errorMessage(error.message, 500) );
    }
};


const singleArticle = async (req, res, next) => {
    try {
        const singleNews = await News.findById(req.params.id)
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname')
            .sort({ timestamps: -1 });
        if (!singleNews) return next(errorMessage('News not found', 404));
        const comments = await Comment.find({ article: req.params.id, status: 'approved' }).sort({ createdAt: -1 });
        res.render('single', { singleNews, comments });
    } catch (error) {
        next(errorMessage(error.message, 500));
    }
};


const search = async (req, res, next) => {
    try {
        const searchQuery = req.query.search;
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
        res.render('search', { paginatedNews, searchQuery, query: req.query });
    } catch (error) {
        next(errorMessage(error.message, 500));
    }
};


const author = async (req, res, next) => {
    try {
        const author = await User.findById(req.params.id);
        if (!author) return next(errorMessage('Author not found', 404));
        const paginatedNews = await paginate(
            News, { author: req.params.id },
            req.query, {
            populate: [
                { path: 'category', select: 'name slug' },
                { path: 'author', select: 'fullname' }
            ],
            sort: { timestamps: -1 }
        });
        res.render('author', { paginatedNews, author, query: req.query });
    } catch (error) {
        next(errorMessage(error.message, 500));
    }
};


const addComment = async (req, res, next) => {
    try {
        const { name, email, content } = req.body;
        const articleId = req.params.id;
        const newComment = new Comment({
            article: articleId,
            name,
            email,
            content
        });
        await newComment.save();
        res.redirect(`/single/${articleId}`);
    } catch (error) {
        next(errorMessage(error.message, 500));
    }
};


export default {
    index,
    articleByCategory,
    singleArticle,
    search,
    author,
    addComment
};