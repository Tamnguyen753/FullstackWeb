import { MongoClient } from "mongodb";
import mongoose from "mongoose";


const uri = "mongodb+srv://nguyendactam0299:<tam123>@cluster0.ugllqye.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
// mongoose.connect("mongodb://127.0.0.1:27017/webmv")
async function connectDB() {
    try {
      // await client.connect(MONGO_URI);
      await mongoose.connect("mongodb+srv://nguyendactam0299:tam123456@cluster0.ugllqye.mongodb.net/?retryWrites=true&w=majority")
      return "Connect dB OK";
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  export default connectDB