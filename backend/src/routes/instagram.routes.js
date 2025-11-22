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

router.delete("/disconnect", instagramDisconnect)

export default router;
