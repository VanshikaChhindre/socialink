import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        avatar: {
            url: { type: String },
            public_id: { type: String}
        },
        password: {
            type: String,
            required: [true, "password is required!"]
        },

        googleId: {
            type: String,
            unique: true, // Should be unique
            sparse: true, // Allows null values, important when mixing with non-Google users
            default: null
        },

        refreshToken: {
            type: String
        },
        connectedAccounts: {
            linkdin: {
            accessToken: String,
            refreshToken: String,
            accountId: String,
            expiresAt: Date
            }
        }
    },
    {timestamps: true}
)

userSchema.pre("save", async function (next){
    if(!this.isModified('password') || this.googleId) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", userSchema)
