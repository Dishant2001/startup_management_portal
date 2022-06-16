const express=require('express');
const {signup,login,startup_details}=require('../controllers/userController');
const Router=express.Router();

Router.route('/signup').post(signup);
Router.route('/login').post(login);
Router.route('/register').post(startup_details);

module.exports=Router;

