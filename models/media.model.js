const mongoose = require("mongoose")

const mediaSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    userID: String,
    user: String
},{
    versionKey: false
})

const MediaModel = mongoose.model("media",mediaSchema)

module.exports = {
    MediaModel
}