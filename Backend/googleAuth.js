const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user_schema");
const env = require("dotenv");
env.config();

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if the user already exists in your database
          const user = await User.findOne({ email: profile.emails[0].value });
  
          if (user) {
            // If the user exists, return it
            return done(null, user);
          } else {
            // If the user doesn't exist, create a new user
            const newUser = new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              // Set a random password or generate one for the user
              password: "P@ssw0rd",
            });
            await newUser.save();
            return done(null, newUser);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });