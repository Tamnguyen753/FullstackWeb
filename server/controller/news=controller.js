import newsModel from "../models/news.js"
import mongoose from "mongoose";

const getNews = async (req,res,next)=>{
    try {
        const allNews = await newsModel.find().sort({ createAt: -1 });
        res.status(201).send(
           allNews
        )
    } catch (error) {
        next(error)
    }
}

const createNews = async (req,res,next)=>{
    try {
        const { title , img , content , type } = req.body;
        if (!title || !content || !img || !type) {
            res.status(400).send({
                message:
                  "title , img and content are required",
              });
              return;
          }
        const newNews = new newsModel({ title , img , content ,type });
        await newNews.save();
        res.status(201).send({
            message:"thanh cong"
        })

    } catch (error) {
      next(error)
    }
    
}

const updateNews = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, img, content , type } = req.body;
        const objectId = new mongoose.Types.ObjectId(id);

        const newsUpdate = await newsModel.findByIdAndUpdate(objectId, { title, img, content ,type }, { new: true });

        if (!newsUpdate) {
            return res.status(404).send({
                message: "Không tìm thấy bản tin",
            });
        }

        res.status(200).send({
            message: "Cập nhật thành công",
            data: newsUpdate,
        });
    } catch (error) {
        next(error);
    }
};
const deleteNews = async (req,res,next)=>{
    try {
        const { id } = req.params;
        const objectId = new mongoose.Types.ObjectId(id);
        const newsDelete = await newsModel.findByIdAndDelete(objectId)
        res.status(201).send({
            message: "Cập nhật thành công",
        });
    } catch (error) {
        next(error)
    }
}
const getNewsById = async (req,res,next)=>{
    try {
        const { id } = req.params;
        const objectId = new mongoose.Types.ObjectId(id);
        const newsFind = await newsModel.findById(objectId)
        if(!newsFind){
            return res.status(404).send({
                message: "Không tìm thấy bản tin",
            });
        }
        res.status(201).send({
            newsFind
        });
    } catch (error) {
        next(error)
    }
}
export { getNews , createNews , updateNews , deleteNews,getNewsById}