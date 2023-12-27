import mongoose from "mongoose";
const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    id: String
})
const accountModel = mongoose.model('accounts',accountSchema)
export default accountModel