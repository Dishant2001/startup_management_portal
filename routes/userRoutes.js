const express=require('express');
const {signup,login}=require('../controllers/userController');
const Router=express.Router();

Router.route('/signup').post(signup);
Router.route('/login').post(login);

module.exports=Router;

