const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
require("dotenv").config()

const userRouter = express.Router()

userRouter.post("/register",async(req,res)=> {
    const {name,email,gender,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            res.status(400).json({msg: "User Already exist"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                const user = new UserModel({name,email,gender,password: hash})
                await user.save();
                res.status(200).json({msg: "User has been registered",user: req.body})
            });
        }
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

userRouter.post("/login",async(req,res)=> { 
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                if(result){
                    let token = jwt.sign({userID: user._id, user: user.name},process.env.secret)
                    res.status(200).json({msg: "Logged in Successfull!!",token})
                }else{
                    res.status(200).json({msg:"Wrong Credentails!!"})
                }
            });
        }else{
            res.status(400).json({msg: "User does not exist!!"})
        }
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

userRouter.post("/logout",async(req,res)=>{
    try {
        const token = req.header.authorization?.split(" ")[1]
        if(token){
            const black = await BlacklistModel.updateMany({}, {$push: {blacklist: [token]}})
            console.log(black)
            res.status(200).send("Logout Successfull!!!")
        }
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = {
    userRouter
}