import mongoose from 'mongoose'
import newID from '../utils/main.js';


const showtimeSchema = new mongoose.Schema({
  showtimeId: {
    type: String,
    default: newID(),
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
});

const ShowtimeModel = mongoose.model('Showtimes', showtimeSchema);

export default ShowtimeModel