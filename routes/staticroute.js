import express from "express";
import { checkAuth } from "../middleware/auth";

const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

export default router;
