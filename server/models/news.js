import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: String,
    img: String,
    createAt: {
        type:Date,
        default:new Date()
    },
    content:String,
    type:String

})
const newsModel = mongoose.model('news',newsSchema)
export default newsModel