import bcrypt from "bcrypt";
import accountModel from "../models/account.js";
import { getToken } from "../utils/index.js";
import movieModel from "../models/movie.js";
import CustomErr from "../utils/error.js";
import theaterModel from "../models/theater.js";
import roomModel from "../models/room.js";
import cinemaModel from "../models/cinema.js";
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password ) {
      throw new CustomErr('username and password are required',400)
    }
    //hash password
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    //check username already
    const currentAccount = await accountModel.findOne({ email });
    if (currentAccount) {
      throw new CustomErr(`Tài khoản đã tồn tại`,409)
    }
    const createAccount = await accountModel.create({
      email,
      password: hashedPassword,
    });
    res.status(201).send({
      message: " Đăng ký thành công!",
      data: createAccount,
    });
    return;
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
  return;
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await accountModel.findOne({
      email,
    });
    //find user
    if (!existingUser) {
      throw new CustomErr("Tên đăng nhập không tồn tại !",409);
    }
    //compare
    const matched = bcrypt.compareSync(password, existingUser.password);
    if (!matched) {
      throw new CustomErr("Password không đúng", 400);
    }
    res.status(200).send({
      message: "Đăng nhập thành công !",
      data: getToken({
        id: existingUser.id,
      }),
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
const movie = async (req, res, next) => {
    try {
        const {
            name,
            image,
            director,
            actor,
            tag,
            duration,
            launch,
            language,
            rating,
            trailer,
          } = req.body;
          const createMoive = await movieModel.create(req.body)
          res.status(201).send({
            message:"Thành công!",
            data: createMoive
          })
    } catch (error) {
        res.status(403).send({
            message: error.message,
          });
    }
};
const getMovie = async(req,res,next) => {
    try {
        const movies = await movieModel.find();
        res.status(201).send({
            message: "Thành công !",
            data: movies
        });
        console.log(movieModel.length);
    } catch (error) {
        res.status(403).send({
            message: error.message
        })
    }
};
const getMovieById = async (req,res,next) =>{
try {
  const movieUUID = String(req.params.id)
  // const movie = await movieModel.findById(movieUUID)
  const movie = await movieModel.findOne({ id: movieUUID });
  console.log(typeof movieUUID); 
  console.log(movieUUID);
  if(!movie) {
    return res.status(404).json({error: "Không tìm thấy phim !"})
  }
  res.json(movie);
} catch (error) {
  res.status(500).json({error:error.message})
}
};

const theater = async (req,res) =>{
  try {
    const {name, location} = req.body;
    const createTheater = await theaterModel.create({name,location});
    res.status(201).send({
      message:"Thành công!",
      data: createTheater
    })
  } catch (error) {
    res.status(403).json({error:error.message})
  }
};

const room = async (req,res) => {
  try {
    const {name, theaterId} = req.body;

    const theater = await theaterModel.findById(theaterId);
    if(!theater){
      return res.status(404).json({error:"Không tìm thấy rạp"})
    }
    const createRoom = await roomModel.create({name, theaterId})
    res.status(201).send({
      message:"Thành công!",
      data: createRoom
    })
  } catch (error) {
    res.status(403).json({error:error.message})
  }
};

const cinema = async(req,res) => {
  try {
    const {name,ticketPrice,city,seats,seatsAvailable} = req.body
    const cinema = await cinemaModel.create({name,ticketPrice,city,seats,seatsAvailable})
    res.status(201).send({
      message:"Thành công!",
      data: cinema
    })
  } catch (error) {
    res.status(403).json({error:error.message})
  }
}




export { register, login , movie, getMovie , getMovieById, theater, room , cinema };
