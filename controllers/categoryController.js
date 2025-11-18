import mongoose from "mongoose";
import Category from "../models/Category.js";

const allCategories = async (req, res) => {
    res.render('admin/categories');
 };
const addCategoryPage = async (req, res) => {
    res.render('admin/categories/create');
 };
const addCategory = async (req, res) => { };
const updateCategoryPage = async (req, res) => { 
    res.render('admin/categories/update');
};
const updateCategory = async (req, res) => { };
const deleteCategory = async (req, res) => { };

export default {
    allCategories,
    addCategoryPage,
    addCategory,
    updateCategoryPage, 
    updateCategory,
    deleteCategory 
}
