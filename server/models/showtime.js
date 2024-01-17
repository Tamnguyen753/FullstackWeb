import mongoose from 'mongoose'



const showtimeSchema = new mongoose.Schema({
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  movieId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Movie',
    required: true,
  },
  cinemaId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Cinema',
    required: true,
  },
});

const ShowtimeModel = mongoose.model('Showtimes', showtimeSchema);

export default ShowtimeModel