import mongoose from "mongoose";
import newID from "../utils/main.js";
const movieSchema = new mongoose.Schema({

    name: String,
    image: String,
    director: String,
    actor: String,
    tag: String,
    duration: String,
    launch: String,
    language: String,
    rating: String,
    trailer: String,
    des: String,
    id: {
        type: String,
        default: newID()
    },
})
const movieModel = mongoose.model('movies',movieSchema)
export default movieModel