const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
 require('dotenv').config();
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 5000");     
    });
  }) 
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); 
}); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/users", require("./routes/authRoute"));
app.use("/api", require("./routes/todoRoutes"));
app.use('/profile',require('./routes/imageRoute'));

