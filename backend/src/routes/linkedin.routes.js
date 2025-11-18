import express from "express";
import { linkedInCallback } from "../controllers/linkedin.controller.js";

const router = express.Router();

router.get("/callback", linkedInCallback)

export default router;
