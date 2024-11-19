// Load environment variables from .env file
require("dotenv").config();

// Importing necessary dependencies
const express = require("express");
const morgan = require("morgan");

const cookieParser = require("cookie-parser");
require("express-async-errors"); // To handle asynchronous errors in middleware

// Database connection
const connectDB = require("./db/connect");

// Middleware for handling 404 and errors
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

// Initialize express app
const app = express();

// Define server port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Global middlewares
app.use(morgan("tiny")); // Logging middleware for development
app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser(process.env.JWT_SECRET)); // Middleware to parse Cookies received

// Routes
app.get("/", (req, res) => {
  res.status(200).send("E-Comm Server"); // Root route with success status
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
// Middleware for handling 404 errors
app.use(notFoundMiddleware);

// Custom error handling middleware
app.use(errorHandlerMiddleware);

// Start the server and connect to the database
const startServer = async () => {
  try {
    // Connect to MongoDB database
    await connectDB(process.env.MONGO_URI);
    // Start listening on specified port
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit process with failure code
  }
};

// Execute start function to initialize server
startServer();
