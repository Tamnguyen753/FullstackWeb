import  express  from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import accountModel from "./models/account.js";
import cors from "cors"
import authRouter from "./routes/auth-route.js";
import verifyTokenMiddware from "./middleware/auth-middleware.js";
import { MongoClient } from "mongodb";
import connectDB from "./config/db.js";
config();
const app = express();
app.use(express.json());
const port = process.env.PORT
app.use(cors())

app.use('/',authRouter)
app.use(verifyTokenMiddware);
app.get("/", (req,res) => {
    res.send({
        mesasag: 'Thành công !'
    })
})

connectDB()
  .then((res) => {
    console.log(res);
    app.listen(port, () => {
      console.log(`Server running up in port :${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });