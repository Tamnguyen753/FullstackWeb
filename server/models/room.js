import mongoose from "mongoose";
import newID from "../utils/main.js";

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        default: newID(),
      },
      name: String,
      seats: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat' },
      theaterId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Theater'}
})
const roomModel = mongoose.model("rooms", roomSchema)
export default roomModel