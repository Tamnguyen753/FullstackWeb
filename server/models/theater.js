import mongoose from "mongoose";
import newID from "../utils/main.js";
import { ObjectId } from "mongodb"


const theaterSchema = new mongoose.Schema({
  name: String,
  location: String,
  rooms: { type: mongoose.SchemaTypes.ObjectId, ref: 'Room' },
  theaterId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Theater', default: new ObjectId()
}
})

const theaterModel = mongoose.model('theaters', theaterSchema)

export default theaterModel