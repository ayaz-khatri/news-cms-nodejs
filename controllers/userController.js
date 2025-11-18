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
    res.render('admin/users/update');
};
const updateUser = async (req, res) => { };
const deleteUser = async (req, res) => { };


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
