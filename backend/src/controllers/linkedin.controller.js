import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import axios from "axios"

const getAccessToken = async (code) => {
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: "http://localhost:5000/api/auth/linkedin/callback"
    });

    const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        body: body.toString()
    });

    if (!response.ok) {
        throw new Error("Failed to get access token");
    }

    const accessToken = await response.json();
    return accessToken;
};


const getUserData = async(accessToken) => {
    const response = await fetch("https://api.linkedin.com/v2/userinfo", {
         method : "GET",
            headers : {
                Authorization: `Bearer ${accessToken.access_token}`
            }   
    })

     if(!response.ok){
            throw new Error(response.statusText);
        }

    const userData = await response.json();
    return userData;
}

export const linkedInCallback = async(req, res) => {
    try {
    const {code} = req.query;
    const accessToken = await getAccessToken(code);
    
    const userData = await getUserData(accessToken);

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

    if(foundUser){
        foundUser.connectedAccounts.linkedin = {
            linkedinId: userData.sub,
            name: userData.name,
            email: userData.email,
            picture: userData.picture,
            accessToken: accessToken.access_token,
            expiresAt: new Date(Date.now() + accessToken.expires_in * 1000),
        }
    }

    await foundUser.save();

    return res.redirect("http://localhost:5173/on-boarding");


    } catch (error) {
         console.error("LinkedIn callback error →", error.message);
    return res.status(500).json({
        success: false,
        message: error.message
    })
    }
}

export const linkedInDisconnect = async (req, res) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json({ message: "Not logged in" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const linkedinAccount = user.connectedAccounts?.linkedin;
    if (!linkedinAccount) {
      return res.status(200).json({ message: "No LinkedIn token to revoke" });
    }

    // 1. Revoke token in LinkedIn
    await axios.post(
      "https://www.linkedin.com/oauth/v2/revoke",
      new URLSearchParams({
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        token: linkedinAccount.accessToken,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    // 2. Remove from database
    user.connectedAccounts.linkedin = undefined;
    await user.save();

    return res.status(200).json({ message: "LinkedIn disconnected" });

  } catch (error) {
    console.log(error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to disconnect LinkedIn" });
  }
};

