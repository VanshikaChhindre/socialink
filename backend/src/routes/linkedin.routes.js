import express from "express";
import { linkedInCallback, linkedInDisconnect } from "../controllers/linkedin.controller.js";

const router = express.Router();

router.get("/callback", linkedInCallback)

router.delete("/disconnect", linkedInDisconnect)

export default router;
