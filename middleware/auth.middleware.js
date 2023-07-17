const jwt = require("jsonwebtoken")
// const { BlacklistModel } = require("../models/blacklist.model")
require("dotenv").config()

const auth = async(req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.secret)
            if(decoded){
                req.body.userID = decoded.userID;
                req.body.user = decoded.user
                next()
            }else{
                res.json({msg: "Not Authorised!!"})
            }
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }else{
        res.json({msg: "Please login!!"})
    }
}

module.exports = {
    auth
}