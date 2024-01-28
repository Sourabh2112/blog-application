import Blog from "../model/Blog";
import User from "../model/user";
import mongoose from "mongoose";

//BLOG DATA

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log("err");
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blog found!!" });
  }
  return res.status(200).json({ blogs });
};

//Add Blogs

export const addBlog = async (req, res, next) => {
  const { title, description, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this ID" });
  }
  let blog = await Blog.create({ title, description, user });
  // const blog = new Blog({
  //   title,
  //   description,
  //   // image,{message: "error"}
  //   user,
  // });
  // try {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  //   await blog.save({ session });
  //   existingUser.blogs.push(blog);
  //   await existingUser.save({ session });
  //   await session.commitTransaction();
  // } catch (err) {
  //   return res.status(500).json(err);
  // }
  return res.status(200).json({ blog });
};

//Update Blogs

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update the blog" });
  }
  return res.status(200).json({ blog });
};

//Find the Blog by Id

export const getById = async (req, res, next) => {
  const Id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(Id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to get the blog" });
  }
  return res.status(200).json({ blog });
};

//Removing Blog

export const removeBlog = async (req, res, next) => {
  const Id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(Id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to remove the blog" });
  }
  return res.status(200).json({ message: "Successfully deleted the Bloooog" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog: userBlogs });
};
