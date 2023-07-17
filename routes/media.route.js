const express = require("express")
const { MediaModel } = require("../models/media.model")
const {auth} = require("../middleware/auth.middleware")

const mediaRouter = express.Router()

mediaRouter.post("/create",auth,async(req,res)=> {
    try {
        const post = new MediaModel(req.body);
        await post.save()
        res.json({msg: "New Post has been added",post: req.body})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

mediaRouter.get("/search",auth,async(req,res)=> {
    try {
        const {query} = req.query;
        let device = new RegExp(query,"i")
        console.log(device)
        const post = await MediaModel.find({device})
        res.send(post)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})
  
mediaRouter.patch("/update/:postID",auth,async(req,res)=>{
    const {postID} = req.params;
    const {userID} = req.body;
    try {
        const post = await MediaModel.findByIdAndUpdate({userID, _id:postID},req.body)
        if(!post){
            res.status(400).json({msg: "Post not found!!"})
        }else{
            res.status(200).json({msg: "Post has been Updated!!",post: req.body})
        }
    } catch (err) {
        res.json({error: err.message})
    }
})

  //Delete the Note
  mediaRouter.delete("/delete/:postID",auth,async(req,res)=>{
    const {postID} = req.params;
    const {userID} = req.body;
    try {
        const post = await MediaModel.findByIdAndDelete({userID, _id:postID})
        if(!post){
            res.status(400).json({msg: "Post not found!!"})
        }else{
            res.status(200).json({msg: "Post has been deleted!!"})
        }
    } catch (err) {
        res.json({error: err.message})
    }
})

module.exports = {
    mediaRouter
}