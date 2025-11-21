import mongoose from "mongoose";
import User from "../models/User.js";


const loginPage = async (req, res) => {
    res.render('admin/login', {
        layout:false
    });
 };
 
const adminLogin = async (req, res) => { };
const logout = async (req, res) => { };
const dashboard = async (req, res) => {
    res.render('admin/dashboard');
 };
 const settings = async (req, res) => {
    res.render('admin/settings');
 };
const allUsers = async (req, res) => {
     try {
        const search =  req.query.search || '';
        const query = {
            $or: [
                {fullname: {$regex: search, $options: 'i'}},
                {username: {$regex: search, $options: 'i'}}]
        };
        const users = await User.find(query);
        res.render('admin/users', {users});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
 };
const addUserPage = async (req, res) => { 
    res.render('admin/users/create');
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
        res.render('admin/users/update', {user});
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
