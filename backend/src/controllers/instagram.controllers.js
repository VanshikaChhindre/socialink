import axios from "axios"

export const getUserInfo = async(req, res) =>{
    try {
    const userData = await axios.get(
    `https://graph.instagram.com/me`,
    {
        params: {
        fields: "id,username,account_type,media_count,followers_count,name,profile_picture_url",
        access_token: IG_ACCESS_TOKEN,
        },
    }
    );

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
        //longlived access token todo
    return res.json(userData.data);


    } catch (error) {
        console.log(error.response?.data || error.message);
        return res.status(500).json({ error: "Failed to fetch IG Data" });
    }
}