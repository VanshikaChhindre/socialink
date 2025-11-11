import { User } from "../models/user.model.js";


export const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();

        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const signup = async(req, res) => {
    try {
        const {name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        
        const existedUser = await User.findOne({email });
   
        if (existedUser) {
            return res.status(409)
                   .json({message : "User already exists.", success: false});
        }

        const user = await User.create({
            name,
            email, 
            password,
        })
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
        )

        if (!createdUser) {
            return res.status(500)
                   .json({message : "Something went wrong while registering the user", success: false});
        }

        /* const options = {
        httpOnly: true,
        secure: true
        } */

        const options = {
        httpOnly: true,
        secure: false,          
        sameSite: "lax",       
        path: "/",   
        };

        return res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            message: "User signed up successfully.",
            success: true,
            user: createdUser,
            accessToken,
            refreshToken
        });

    } catch (error) {
         return res.status(500)
                   .json({message : `Internal server error: ${error.message}`, success: false});
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400)
                   .json({message : "email and password is required", success: false});
    }
    

    const user = await User.findOne({email})

    if (!user) {
        return res.status(404)
                   .json({message : "user doesn't exist", success: false});
    }
   
   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    return res.status(401)
                   .json({message : "Invalid user credentials.", success: false});
   }

   const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password ") /* -refreshToken */


    //for local server 
    const options = {
        httpOnly: true,
        secure: false,          
        sameSite: "lax",       
        path: "/",   
    };


    //for production
    //use the below options while deploying, delete the above ones
    /* const options = {
        httpOnly: true,
        secure: true
    } */

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ 
         message : "login successfull.", 
         success: true,
         user: loggedInUser, accessToken, refreshToken
        }
    )
    } catch (error) {
     return res.status(500)
                .json({message : `Internal server error: ${error.message}`, success: false});   
    }
}

const logout = async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({message :  "User logged Out", success:true })
}

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    console.log("refresh token", req.cookies)

    if (!incomingRefreshToken) {
        return res.status(401)
                   .json({message : "Unauthorized request", success: false});
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            return res.status(401)
                   .json({message : "Invalid refresh token", success: false});
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401)
                   .json({message : "Refresh token is expired or used.", success: false});
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
        console.log("newrefreshtoken : ", refreshToken)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            {message:  "Access token refreshed", success: true, data : {accessToken, refreshToken: refreshToken}}
               
            )
    } catch (error) {
        return res.status(500)
                   .json({message : `Internal server error ${error.message}`, success: false});
    }

}

const getCurrentUser = async (req, res) => {
    
    if (!req.user || !req.user._id) {
        return res.status(401).json({
            message: "Unauthorized: No active session.",
            success: false
        });
    }
    try {
        const user = await User.findById(req.user._id).select("-password -refreshToken");
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "User fetched successfully.",
            success: true,
            user: user
        });

    } catch (error) {
        return res.status(500).json({ 
            message: `Internal server error: ${error.message}`, 
            success: false 
        });
    }
}

export { 
    signup,
    login,
    logout,
    refreshAccessToken,
    getCurrentUser
}