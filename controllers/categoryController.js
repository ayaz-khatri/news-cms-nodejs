import Category from "../models/Category.js";
import News from "../models/News.js";
import errorMessage from "../utils/error-message.js";
import { validationResult } from "express-validator";

const allCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.render('admin/categories', {categories, role: req.role});
    } catch (error) {
        next( errorMessage(error.message, 500) );
    }
 };
const addCategoryPage = async (req, res) => {
    res.render('admin/categories/create', {role: req.role, errors: []});
 };
const addCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/categories/create', {
            role: req.role,
            errors: errors.array()
        });
    }
    try {
        const category = new Category(req.body);
        const saved = await category.save();
        res.redirect('/admin/categories');
        // res.status(201).json(saved);
    } catch (error) {
       next( errorMessage(error.message, 500) );
    }
 };
const updateCategoryPage = async (req, res, next) => {
     try {
        const category = await Category.findById(req.params.id);
        if (!category) return next( errorMessage('Category not found.', 404) );
        res.render('admin/categories/update', {category, role: req.role, errors: []});
    } catch (error) {
        next( errorMessage(error.message, 500) );
    } 
};
const updateCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const category = await Category.findById(req.params.id);
        return res.render('admin/categories/update', {
            category,
            role: req.role,
            errors: errors.array()
        });
    }
    const { name, description } = req.body;
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return next( errorMessage('Category not found.', 404) );
        category.name = name || category.name;
        category.description = description || category.description;
        const saved = await category.save();
        res.redirect('/admin/categories');
        // res.status(201).json(saved);
    } catch (error) {
        next( errorMessage(error.message, 500) );
    }
 };
const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return next( errorMessage('Category not found.', 404) );

        const article = await News.findOne({category: req.params.id});
        if (article) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete category with associated articles.'
            });
        }

        await Category.deleteOne({_id: req.params.id});
        res.json({success:true});
    } catch (error) {
        next( errorMessage(error.message, 500) );
    }
};

export default {
    allCategories,
    addCategoryPage,
    addCategory,
    updateCategoryPage, 
    updateCategory,
    deleteCategory 
}
