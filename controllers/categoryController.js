import mongoose from "mongoose";
import Category from "../models/Category.js";

const allCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('admin/categories', {categories, role: req.role});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
 };
const addCategoryPage = async (req, res) => {
    res.render('admin/categories/create', {role: req.role});
 };
const addCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        const saved = await category.save();
        res.redirect('/admin/categories');
        // res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
 };
const updateCategoryPage = async (req, res) => {
     try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({message: 'Category not found'});
        res.render('admin/categories/update', {category, role: req.role});
    } catch (error) {
        res.status(500).json({message: error.message});
    } 
};
const updateCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({message: 'Category not found'});
        category.name = name || category.name;
        category.description = description || category.description;
        const saved = await category.save();
        res.redirect('/admin/categories');
        // res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
 };
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({message: 'Category not found'});
        res.json({success:true});
    } catch (error) {
        res.status(500).json({message: error.message});
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
