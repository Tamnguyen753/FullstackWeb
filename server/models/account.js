import mongoose from "mongoose";
import newID from "../utils/main.js";
const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    id: {
        type: String,
        default: newID()
    }
})
const accountModel = mongoose.model('accounts', accountSchema)
export default accountModel