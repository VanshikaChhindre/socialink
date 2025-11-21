import axios from "axios"
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const getUserInfo = async(req, res) =>{

    try {
    const iguser = await axios.get(
    `https://graph.instagram.com/me`,
    {
        params: {
        fields: "id,username,account_type,media_count,followers_count,name,profile_picture_url",
        access_token: process.env.IG_SHORT_ACCESS_TOKEN,
        },
    }
    );

    
    const userData = iguser.data;

    const token = req.cookies?.accessToken;
    
        if (!token) {
          return res.status(401).json({
            message: "User is not logged in. Must log in first."
          });
        }
    
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const foundUser = await User.findById(decoded._id);
    
        if (!foundUser) {
          return res.status(404).json({
            message: "User not found in database",
            success: false
          });
        }
    
        //saving user data todo
        if(foundUser){
        foundUser.connectedAccounts.instagram = {
            instagramId: userData.id,  
            username: userData.username,
            mediaCount: userData.media_count,
            followCount: userData.followers_count,
            picture: userData.profile_picture_url,
            accessToken: process.env.IG_SHORT_ACCESS_TOKEN,
            expiresAt: new Date(Date.now() + 10 * 1000),
        }
    }

    await foundUser.save();

    return res.status(200).json({ success: true });

    } catch (error) {
        console.log(error.response?.data || error.message);
        return res.status(500).json({ error: "Failed to fetch IG Data" });
    }
}