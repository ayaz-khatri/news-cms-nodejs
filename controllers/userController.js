import mongoose from "mongoose";
import User from "../models/User.js";
import News from "../models/News.js";
import Category from "../models/Category.js";
import Setting from "../models/Setting.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();


const loginPage = async (req, res) => {
    res.render('admin/login', {
        layout:false
    });
 };
 
const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) return res.status(400).json({message: 'Invalid username or password'});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: 'Invalid username or password'});
        const jwtData = {id: user._id, role: user.role, fullname: user.fullname}
        const token = jwt.sign(jwtData, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.cookie('token', token, {httpOnly: true, maxAge: 60 * 60 * 1000});
        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
 };

const logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin/');
 };

const dashboard = async (req, res) => {
    let articleCount;
    if(req.role == 'admin'){
        articleCount = await News.countDocuments();
    } else {
        articleCount = await News.countDocuments({author: req.id});
    }
    const userCount = await User.countDocuments();
    const categoryCount = await Category.countDocuments();
    res.render('admin/dashboard', {role: req.role, fullname: req.fullname, articleCount, userCount, categoryCount});
 };
const settings = async (req, res) => {
    const settings = await Setting.findOne();
    res.render('admin/settings', {role: req.role, settings});
 };

const saveSettings = async (req, res) => {
    try {
        const settings = await Setting.findOne();
        const { title, description } = req.body;
        const updateData = { title, description };
        if (req.file){
            updateData.logo = req.file.filename;
            if(settings && settings.logo){
                const imagePath = path.join('./public/uploads/', settings.logo);
                fs.unlink(imagePath, (err) => {
                    if (err) console.log('Failed to delete image:', err);
                });
            }
        }
        const saved = await Setting.findOneAndUpdate(
            {},
            updateData,
            { new: true, upsert: true }
        );
        res.redirect('/admin/settings');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const allUsers = async (req, res) => {
     try {
        const users = await User.find();
        res.render('admin/users', {users, role: req.role});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
 };
const addUserPage = async (req, res) => { 
    res.render('admin/users/create', {role: req.role});
};
const addUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const saved = await user.save();
        res.redirect('/admin/users');
        // res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
 };
const updateUserPage = async (req, res) => { 
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({message: 'User not found'});
        res.render('admin/users/update', {user, role: req.role});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
const updateUser = async (req, res) => {
    const { fullname, password, role } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({message: 'User not found'});
        user.fullname = fullname || user.fullname;
        if (password) user.password = password;
        user.role = role || user.role;
        const saved = await user.save();
        res.redirect('/admin/users');
        // res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
 };
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({message: 'User not found'});
        res.json({success:true});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


export default {
    loginPage,
    adminLogin,
    logout,
    allUsers,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser, 
    deleteUser,
    dashboard,
    settings,
    saveSettings
}
