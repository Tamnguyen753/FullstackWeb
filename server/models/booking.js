import mongoose, { SchemaTypes } from "mongoose";

const bookingSchema = mongoose.Schema({
    showtimeId: { type: SchemaTypes.ObjectId, ref: 'Showtime', required: true },
    seatNumbers: [{ type: String, required: true }],
    userId: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
})

const bookingModel = mongoose.model("bookings", bookingSchema)
export default bookingModel