import  express  from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import accountModel from "./models/account.js";
import cors from "cors"
import authRouter from "./routes/auth-route.js";
import verifyTokenMiddware from "./middleware/auth-middleware.js";
import newRoute from "./routes/news-route.js";
config();
const app = express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/webmv")
const port = process.env.PORT
app.use(cors())

app.use('/',authRouter)
app.use("/news",newRoute)

app.use(verifyTokenMiddware);


app.get("/", (req,res) => {
    res.send({
        mesasag: 'Thành công !'
    })
})

app.listen(port, () => {
    console.log("Server chạy thành công !")
})