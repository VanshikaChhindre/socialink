import express from "express";
import passport from "../config/linkedin.passport.js";

const router = express.Router();

// Login redirect to LinkedIn
router.get("/linkedin", 
  passport.authenticate("linkedin")
);

// Callback URL
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);

export default router;
