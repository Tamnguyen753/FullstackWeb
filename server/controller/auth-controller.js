import bcrypt from 'bcrypt'
import accountModel from '../models/account.js';
import { getToken } from '../utils/index.js';
const register = async (req,res,next) => {
    try {
        const {email, password } = req.body;
        if(!email || !password ||(password && String(password).length <= 6)){
            res.status(403).send({
                message:
                  "Email và password cần phải cung cấp, password cần ít nhất 6 ký tự",
              });
              return;
        }
        //hash password
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password,salt)
        //check username already
        const currentAccount = await accountModel.findOne({ email }) 
        if(currentAccount) {
            res.status(403).send({
                message: "Tài khoản đã tồn tại !"
            });
            return;
        };
        const createAccount = await accountModel.create({email, password: hashedPassword});
        res.status(201).send({
            message:" Đăng ký thành công!",
            data: createAccount
        });
        return;
        } catch (error) {
            res.status(403).send({
                message: error.message,
            })
        }
        return;
};
const login = async (req,res,next) => {
    try {
        const { email, password} = req.body;
        const existingUser = await accountModel.findOne({
            email
        })
        //find user
        if(!existingUser){
            throw new Error('Tên đăng nhập ko tồn tại !')
        }
        //compare
        const matched = bcrypt.compareSync(password,existingUser.password)
        if(!matched){
            throw new Error('Password không đúng',400)
        }
        res.status(200).send({
            message:  "Đăng nhập thành công !",
            data: getToken({
                id: existingUser.id
            })
        })
    } catch (error) {
        res.status(403).send({
            message: error.message,
        })
    }
}
export {
    register,
    login
}