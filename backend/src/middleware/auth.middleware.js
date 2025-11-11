import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const verifyJWT = async(req, res, next) => {
    try {
        const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
           return res.send(401).json({message : "Unauthorized request!", success: false})
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )

        if(!user){
            return res.send(401).json({message : "Invalid Access Token", success: false})
        }

        req.user = user;
        next()

    } catch (error) {
         return res.send(401).json({message : `Invalid Access: ${error.message}`, success: false})
    }
}