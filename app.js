require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
// Server Setup
const app = express();
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Listening on ${port}`));
  } catch (error) {}
};

// Start Server
start();
