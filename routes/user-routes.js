import express from "express";
import { getAlluser, login, logout, signup } from "../controllers/user-controllers";

const router = express.Router();

router.get("/", getAlluser);
router.post("/signup",signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;