import express from "express";
import { addBlog, getAllBlogs, updateBlog, getById, removeBlog, getByUserId } from "../controllers/blog-controllers";

const blogrouter = express.Router();

blogrouter.get("/",getAllBlogs);
blogrouter.post("/add",addBlog);
blogrouter.put("/update/:id",updateBlog);
blogrouter.get("/:id",getById);
blogrouter.delete("/:id",removeBlog);
blogrouter.get("/user/:id",getByUserId);

export default blogrouter;