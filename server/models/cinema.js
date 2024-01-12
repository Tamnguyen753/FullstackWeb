import mongoose from "mongoose";

const cinemaSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    seats: {
      type: [mongoose.SchemaTypes.Mixed],
      required: true,
    },
    seatsAvailable: {
      type: Number,
      required: true,
    }
  });

  const cinemaModel = mongoose.model("cinemas",cinemaSchema)
  export default cinemaModel