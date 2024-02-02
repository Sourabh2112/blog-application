import express from "express";
import { checkAuth } from "../middleware/auth";
import { getUser } from "../service/auth";

const router = express.Router();
import Blog from "../model/Blog";

router.get("/blog", checkAuth, async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allblogs = await Blog.find();
  // res.send({allblogss});
  return res.render("blog", {
    blogs: allblogs,
  });
});

router.get("/addBlog", (req, res) => {
  return res.render("addBlog");
});

router.get("/user", async (req, res) => {
  const id = req.cookies?.uid;
  const user = getUser(id);
  const userblogs = await Blog.find({ user: user._id });
  return res.render(
    "user",
    {
      blogs: userblogs,
    }
  );
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

export default router;
