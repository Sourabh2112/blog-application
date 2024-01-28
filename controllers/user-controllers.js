import User from "../model/user";
import bcrypt from "bcryptjs";
import { setUser } from "../service/auth";

//USER DATA

export const getAlluser = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "no user found" });
  }
  return res.status(200).json({ users });
};

//SIGN-UP

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .redirect("/login");
  }
  const hashedpassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedpassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).redirect("/login");
};

// LOGIN

export const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).redirect("/login");
  }
  const iscorrectpassword = bcrypt.compareSync(password, existingUser.password);
  if (!iscorrectpassword) {
    return res.status(400).redirect("/login");
  }

  const token = setUser(existingUser);
  res.cookie("uid", token);
  // res.send("login successfully")
  return res.status(200).redirect("/blog");
};

export const logout = async (req, res) => {
  res.clearCookie("uid").status(204).json({ msg: "logout successfull" });
  // await req.user.save();
};
