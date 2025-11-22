import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { getInstagramMedia, getUserInfo, instagramDisconnect } from "../controllers/instagram.controllers.js";

dotenv.config();

const router = express.Router();

// IG token saved in .env
const IG_ACCESS_TOKEN = process.env.IG_SHORT_ACCESS_TOKEN;

router.get("/me", getUserInfo); 

router.get("/media", getInstagramMedia);

router.delete("/disconnect", instagramDisconnect);

router.get("/insights", async (req, res) => {
  try {
    const url = `https://graph.instagram.com/v24.0/${process.env.IG_ACCOUNT_ID}/insights`;
    
    const metrics = [
      "likes",
      "shares",
      "follower_count",
      "reach",
      "profile_views"
    ].join(",");

    const response = await axios.get(url, {
      params: {
        metric: metrics,
        period: "days_28",
        access_token: IG_ACCESS_TOKEN
      }
    });

    console.log(response.data)
    res.json({
      success: true,
      insights: response.data
    });

  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});


export default router;
