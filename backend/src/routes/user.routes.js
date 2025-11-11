import { Router } from "express";
import { login, logout, signup, refreshAccessToken, getCurrentUser } from "../controllers/user.controllers.js";
import {signupValidation, loginValidation} from "../middleware/auth.validation.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/signup").post(signupValidation, signup);
router.route("/login").post(loginValidation, login);
router.route("/logout").post(verifyJWT, logout)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/current-user").get(verifyJWT, getCurrentUser)


export default router