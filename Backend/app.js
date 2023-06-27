// importing packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const env = require("dotenv");
const session = require("express-session");
const passport = require("passport");
require("./googleAuth");


const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

env.config();

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your_secret_key", // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 5000;

try {
  mongoose.connect(process.env.DATA_BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(`Error:${error.message}`);
  process.exit();
}

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      // Generate a JWT token
      const token = await req.user.generateAuthToken();

      // Prepare the user data to be sent to the frontend
      const userData = {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        // Add any other desired user properties
      };

      // Redirect to the frontend URL along with the token as a query parameter
      res.redirect(`http://localhost:3000/?token=${token}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


app.use(authRoutes);
app.use(orderRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
