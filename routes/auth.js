const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');
const Owner = require('../models/Owner');
const bcrypt = require('bcryptjs');
const verifyUser = async (req,res,next)=>{

    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    try{
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({msg: 'Token is not valid'});
    }
}


router.get('/user',verifyUser,async (req,res)=>{
    const {user} = req;
    console.log("user",user)
    const user_data = await User.findOne({_id:user.id});
    console.log(user_data);
    const res_obj = {};
    res_obj.name = user_data.name;
    res_obj.email = user_data.email;
    res_obj.id = user_data._id;
    res.json(res_obj);
}).get('/owner',verifyUser,async (req,res)=>{
    const {user} = req;
    const user_data = await Owner.findOne({_id:user.id});
    const res_obj = {};
    res_obj.name = user_data.name;
    res_obj.email = user_data.email;
    res_obj.id = user_data._id;

    res.json(res_obj);
}).post('/login/user',async (req,res)=>{
    const {email,password} = req.body;

    // find a user with the email
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({msg: 'User does not exist'});
    }
    // check if password is correct
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        return res.status(400).json({msg: 'Invalid credentials'});
    }
    // create and assign a token
    const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({token,account_type:"user"});
}).post('/login/owner',async (req,res)=>{
    const {email,password} = req.body;

    // find a user with the email
    const owner = await Owner.findOne({email});
    if(!owner){
        return res.status(400).json({msg: 'Owner does not exist'});
    }
    // check if password is correct
    const isValid = await bcrypt.compare(password, owner.password);
    if(!isValid){
        return res.status(400).json({msg: 'Invalid credentials'});
    }
    // create and assign a token
    const token = await jwt.sign({id: owner._id}, process.env.JWT_SECRET);
    res.json({token,account_type:"owner"});
}).post('/register/owner',async (req,res)=>{
    const {name,email,password} = req.body;
    const owner = await Owner.findOne({email});
    if(owner){
        return res.status(400).json({msg: 'Owner already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const new_owner = new Owner({
        name,
        email,
        password:hash
    });
    
 
    await new_owner.save();
    res.json({msg: 'Owner registered successfully'});
}).post('/register/user',async (req,res)=>{
    const {name,email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({msg: 'User already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const new_user = new User({
        name,
        email,
        password:hash
    });
    
    await new_user.save();
    res.json({msg: 'User registered successfully'});
})


module.exports = router;