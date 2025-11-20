import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { getUserInfo } from "../controllers/instagram.controllers.js";

dotenv.config();

const router = express.Router();

// IG token saved in .env
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;

router.get("/me", getUserInfo);

router.get("/media", async (req, res) => {
try {
    const response = await axios.get(
    `https://graph.instagram.com/me/media`,
    {
        params: {
        fields: "id,caption,media_url,media_type,permalink,timestamp",
        access_token: IG_ACCESS_TOKEN,
        },
    }
);

return res.json(response.data);

} catch (error) {
console.log(error.response?.data || error.message);
return res.status(500).json({ error: "Failed to fetch IG media" });
}
});


export default router;
