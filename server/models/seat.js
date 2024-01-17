import mongoose from "mongoose";
import newID from "../utils/main.js";

const seatSchema = new mongoose.Schema({
    seatId: {
        type: String,
        default: newID()},
   Number: Number,
   isBooked: { type: Boolean, default: false },
   room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
})
const seatModel = mongoose.model("seats", seatSchema)
export default seatModel