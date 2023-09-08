const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req,res)=>{
    // check existing user
    const{username,email,password} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"User Already Exist"});
        }
        console.log(password);
        const hashedPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({
            email:email,
            password:hashedPassword,
            username:username
        });

        const token = jwt.sign({email:result.email , id:result._id},SECRET_KEY);
        res.status(201).json({user:result,token:token});
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});    
    }    




}

const signin = async (req,res)=>{
    const{email,password} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"User Not Found"});
        }
        const matchedPassword = await bcrypt.compare(password,existingUser.password);
        if(!matchedPassword){
            return res.status(400).json({message:"Wrong password"});
        }

        
        const token = jwt.sign({email:existingUser.email , id:existingUser._id},SECRET_KEY);
        res.status(201).json({user:existingUser,token:token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});    
    }
}

module.exports = {signup , signin};