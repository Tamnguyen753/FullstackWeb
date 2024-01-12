import {Router} from 'express'
import {register, login, movie, getMovie, getMovieById, theater, room, cinema} from '../controller/auth-controller.js'
const authRouter = Router();

authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post('/movie',movie)
authRouter.get('/getMovie',getMovie)
authRouter.get('/getMovie/:id',getMovieById)
authRouter.post('/theater',theater)
authRouter.post('/room',room)
authRouter.post('/cinema',cinema)
// số lượng rạp: 3 . phòng: 2 . ghế: 20
// data: thời gian chiếu



export default authRouter