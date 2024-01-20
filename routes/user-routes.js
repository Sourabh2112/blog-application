import express from "express";
import { getAlluser, login, signup } from "../controllers/user-controllers";

const router = express.Router();

router.get("/", getAlluser);
router.post("/signup",signup);
router.post("/login", login)

export default router;