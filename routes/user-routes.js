import express from "express";
import { getAlluser, login, logout, signup } from "../controllers/user-controllers";
import { checkAuth } from "../middleware/auth";

const router = express.Router();

router.get("/",checkAuth, getAlluser);
router.post("/signup",signup);
router.post("/login", login);
router.post("/logout",checkAuth, logout);

export default router;