import { Router } from 'express'
import { register, login, movie, getMovie, getMovieById, cinema, getCinema, getCinemabyId, showTime, getShowtime, getShowtimebyId, booking, getBooking, getBookingbyId, getShowtimebyMovieId } from '../controller/auth-controller.js'
const authRouter = Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/movie', movie)
authRouter.get('/getMovie', getMovie)
authRouter.get('/getMovie/:id', getMovieById)
authRouter.post('/cinema', cinema)
authRouter.get('/cinema', getCinema)
authRouter.get('/cinema/:id', getCinemabyId)
authRouter.post('/showtime', showTime)
authRouter.get("/showtime", getShowtime)
// authRouter.get("/showtime/:id", getShowtimebyId)
authRouter.get("/showtime/:id", getShowtimebyMovieId)
authRouter.post("/booking", booking)
authRouter.get("/booking", getBooking)
authRouter.get("/booking", getBookingbyId)

// số lượng rạp: 3 . phòng: 2 . ghế: 20
// data: thời gian chiếu



export default authRouter