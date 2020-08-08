// Import packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const retweetRoutes = require("./routes/retweetedPost");

const app = express();

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("DB Connected...");
    })
    .catch((err) => console.log("DB DIDNT CONNECT.."));

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api", userRoutes);
app.use("/api", retweetRoutes);

app.get("/", (req, res) => {
    res.send("hello");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ===> ${PORT}`));
