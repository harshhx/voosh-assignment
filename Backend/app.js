// importing packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const env = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

env.config();

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

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

app.use(authRoutes);
app.use(orderRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
