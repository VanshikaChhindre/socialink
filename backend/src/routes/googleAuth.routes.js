import express from "express";
import passport from "../config/googleAuth.js"; 
import { generateAccessAndRefreshTokens } from "../controllers/user.controllers.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login", session: false }),
  async (req, res) => {
    const user = req.user;
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    /* const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }; */

    const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    };


    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .redirect("http://localhost:5173/on-boarding"); // frontend route
  }
);

export default router;
