import  express  from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import accountModel from "./models/account.js";
import cors from "cors"
import authRouter from "./routes/auth-route.js";
import verifyTokenMiddware from "./middleware/auth-middleware.js";
config();
const app = express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/webmv")
const port = process.env.PORT
app.use(cors())

app.use('/',authRouter)
app.use(verifyTokenMiddware);


// app.post("/register",async (req,res) => {
//     try {
//     const {email, password } = req.body;
//     const currentAccount = await accountModel.findOne({ email }) 
//     if(!email || !password ||(password && String(password).length <= 6)){
//         res.status(403).send({
//             message:
//               "Email và password cần phải cung cấp, password cần ít nhất 6 ký tự",
//           });
//           return;
//     }
//     if(currentAccount) {
//         res.status(403).send({
//             message: "Tài khoản đã tồn tại !"
//         });
//         return;
//     };
//     const createAccount = await accountModel.create({email, password});
//     res.status(201).send({
//         message:" Đăng ký thành công!",
//         data: createAccount
//     });
//     return;
//     } catch (error) {
//         res.status(403).send({
//             message: error.message,
//         })
//     }
//     return;
// })

// app.post('/login',async (req,res) => {
//     try {
//         const { email, password} = req.body;
//         const currentAccount = await accountModel.findOne({
//             email,
//             password
//         })
//         if(!currentAccount){
//             throw new Error('Sai tên đăng nhập hoặc mật khẩu !')
//         }
//         res.status(200).send({
//             message:  "Đăng nhập thành công !",
//             data: "token..."
//         })
//     } catch (error) {
//         res.status(403).send({
//             message: error.message,
//         })
//     }
// })

app.get("/", (req,res) => {
    res.send({
        mesasag: 'Thành công !'
    })
})

app.listen(port, () => {
    console.log("Server chạy thành công !")
})