import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { User } from "../models/user.model.js";

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/linkedin/callback",
      scope: ["openid", "profile", "email", "w_member_social"],
      state: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName || "LinkedIn User",
            email,
            password: "linkedin-placeholder",
          });
        }

        // Save tokens inside connectedAccounts
        user.connectedAccounts = {
          linkedin: {
            accessToken,
            refreshToken,
            accountId: profile.id,
            expiresAt: Date.now() + 3500 * 1000
          }
        };

        await user.save();

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
