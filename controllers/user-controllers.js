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
      .json({ message: "user already exit! Login instead" });
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
  return res.status(201).json({ User });
};

// LOGIN

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found!! Please signup" });
  }
  const iscorrectpassword = bcrypt.compareSync(password, existingUser.password);
  if (!iscorrectpassword) {
    return res.status(400).json({ message: "Incorrect pasword" });
  }

  const token = setUser(existingUser);
  res.cookie("uid", token);
  return res.status(200).json({ message: "Login Successfull:)" });
};

export const logout = async (req, res) => {
  res.clearCookie("uid").status(204).json({ msg: "logout successfull" });
  // await req.user.save();
};
