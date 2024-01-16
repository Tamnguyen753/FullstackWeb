import {Router} from 'express'
import { createNews, deleteNews, getNews, getNewsById, updateNews } from '../controller/news=controller.js';


const newRoute = Router();

newRoute.get("/",getNews)
newRoute.get("/:id",getNewsById)
newRoute.post("/",createNews)
newRoute.put("/:id",updateNews)
newRoute.delete("/:id",deleteNews)

export default newRoute