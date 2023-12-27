import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'accounts'
    },
    fullName: String,
    age: Number,
    phone: Number,
    active:{
        type: Boolean,
        default: false
    }
});
const userModel = mongoose.model('user',userSchema)
export default userModel