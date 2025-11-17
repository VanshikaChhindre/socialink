import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
        try {
            user = await User.create({
            name: profile.displayName || "Google User",
            email: profile.emails?.[0]?.value,
            password: "google-oauth-placeholder",
            googleId: profile.id, // Now safely stored         
            });
        } catch (error) {
            console.error("Error creating user from Google login:", error);
            return done(error, null);
        }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
