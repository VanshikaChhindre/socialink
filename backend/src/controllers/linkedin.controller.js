import { User } from "../models/user.model.js";

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
        console.log(await response.text());
        throw new Error("Failed to get access token");
    }

    console.log("access response: ", response)
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
    console.log("User data:", userData);

    const user =  req.user;

    const foundUser = await User.findById(user._id);

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
        res.status(500).json({
        error
    })
    }
}