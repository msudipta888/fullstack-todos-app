const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/TestforApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/users", require("./routes/authRoute"));
app.use("/api", require("./routes/todoRoutes"));
app.use('/uploads',express.static('uploads'))
app.use('/profile',require('./routes/imageRoute'));
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
