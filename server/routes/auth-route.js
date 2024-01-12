import { Router } from 'express'
import { register, login, movie, getMovie, getMovieById, cinema, getCinema, getCinemabyId, showTime, getShowtime, getShowtimebyId } from '../controller/auth-controller.js'
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
authRouter.get("/showtime/:id", getShowtimebyId)

// số lượng rạp: 3 . phòng: 2 . ghế: 20
// data: thời gian chiếu



export default authRouter