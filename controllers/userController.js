import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    res.render('admin/dashboard', {role: req.role, fullname: req.fullname});
 };
 const settings = async (req, res) => {
    res.render('admin/settings', {role: req.role});
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
    settings
}
