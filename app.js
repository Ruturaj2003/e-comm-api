require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// Other packages
const morgan = require("morgan");

// Server Setup
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(morgan("tiny"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("E-Comm Server").status(200);
  return;
});

// Last Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Listening on ${port}`));
  } catch (error) {}
};

// Start Server
start();
