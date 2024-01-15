import bcrypt from "bcryptjs";
import accountModel from "../models/account.js";
import { getToken } from "../utils/index.js";
import movieModel from "../models/movie.js";
import CustomErr from "../utils/error.js";
import cinemaModel from "../models/cinema.js";
import mongoose from "mongoose";
import ShowtimeModel from "../models/showtime.js";
import bookingModel from "../models/booking.js";
const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new CustomErr('username and password are required', 400)
    }
    //hash password
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    //check username already
    const currentAccount = await accountModel.findOne({ username });
    if (currentAccount) {
      throw new CustomErr(`Tài khoản đã tồn tại`, 409)
    }
    const createAccount = await accountModel.create({
      username,
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
    const { username, password } = req.body;
    const existingUser = await accountModel.findOne({
      username,
    });
    //find user
    if (!existingUser) {
      throw new CustomErr("Tên đăng nhập không tồn tại !", 409);
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
      message: "Thành công!",
      data: createMoive
    })
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
const getMovie = async (req, res, next) => {
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
const getMovieById = async (req, res, next) => {
  try {
    const movieUUID = String(req.params.id)
    const movie = await movieModel.findById(movieUUID)
    console.log(typeof movieUUID);
    console.log(movieUUID);
    if (!movie) {
      return res.status(404).json({ error: "Không tìm thấy phim !" })
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const cinema = async (req, res) => {
  try {
    const { name, ticketPrice, city, seats, seatsAvailable } = req.body
    const cinema = await cinemaModel.create({ name, ticketPrice, city, seats, seatsAvailable })
    res.status(201).send({
      message: "Thành công!",
      data: cinema
    })
  } catch (error) {
    res.status(403).json({ error: error.message })
  }
}

const getCinema = async (req, res) => {
  try {
    const cinemas = await cinemaModel.find()
    res.status(201).send({
      message: "Thành công !",
      data: cinemas
    });
  } catch (error) {
    res.status(403).send({
      message: error.message
    })
  }
};

const getCinemabyId = async (req, res) => {
  try {
    const _id = String(req.params.id);
    const cinema = await cinemaModel.findById(_id);
    if (!cinema) {
      return res.status(404).json({ error: "Không tìm thấy rạp !" })
    }
    res.json(cinema);
  } catch (error) {
    res.status(500).json({ error: error.message })
  };

};
const showTime = async (req, res) => {
  try {
    const { startAt, startDate, endDate, movieId, cinemaId } = req.body;
    const createShowtime = await ShowtimeModel.create({ startAt, startDate, endDate, movieId, cinemaId });
    res.status(201).send({
      message: "Thành công!",
      data: createShowtime
    })
  } catch (error) {
    res.status(403).json({ error: error.message })
  }
};
const getShowtime = async (req, res) => {
  try {
    const showTime = await ShowtimeModel.find()
    res.status(201).send({
      message: "Thành công !",
      data: showTime
    });
  } catch (error) {
    res.status(403).send({
      message: error.message
    })
  }
};
const getShowtimebyId = async (req, res) => {
  try {
    const _id = String(req.params.id);
    const showTime = await ShowtimeModel.findById(_id);
    if (!showTime) {
      return res.status(404).json({ error: "Không tìm thấy showtime !" })
    }
    res.json(showTime);
  } catch (error) {
    res.status(500).json({ error: error.message })
  };

};
const getShowtimebyMovieId = async (req, res) => {
  try {
    const movieId = String(req.params.id)
    const showTime = await ShowtimeModel.find({ movieId: movieId })
    if (!showTime) {
      return res.status(404).json({ error: "Không tìm thấy showtime !" })
    }
    res.json(showTime);
  } catch (error) {
    res.status(500).json({ error: error.message })
  };

};


const booking = async (req, res) => {
  try {
    const { showtimeId, seatNumbers, userId } = req.body;
    const createbooking = await bookingModel.create({ showtimeId, seatNumbers, userId });
    res.status(201).send({
      message: "Thành công!",
      data: createbooking
    })
  } catch (error) {
    res.status(403).json({ error: error.message })
  }
};
const getBooking = async (req, res) => {
  try {
    const booking = await bookingModel.find()
    res.status(201).send({
      message: "Thành công !",
      data: booking
    });
  } catch (error) {
    res.status(403).send({
      message: error.message
    })
  }
};
const getBookingbyId = async (req, res) => {
  try {
    const _id = String(req.params.id);
    const booking = await bookingModel.findById(_id);
    if (!booking) {
      return res.status(404).json({ error: "Không tìm thấy booking !" })
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message })
  };

};




export { register, login, movie, getMovie, getMovieById, cinema, getCinema, getCinemabyId, showTime, getShowtime, getShowtimebyId, booking, getBooking, getBookingbyId, getShowtimebyMovieId };