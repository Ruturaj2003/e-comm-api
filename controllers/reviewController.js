const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const Review = require("../models/Review");
const checkPermissions = require("../utils/checkPermissions");
const CustomError = require("../errors");

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new CustomError.NotFoundError("No Product with id " + productId);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError("Already Submitted For this product");
  }
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};
const getAllReviews = async (req, res) => {
  res.send("Get All Reviews Function Called");
};
const getSingleReview = async (req, res) => {
  res.send("Get Single Review Function Called");
};
const updateReview = async (req, res) => {
  res.send("Update Review Function Called");
};
const deleteReview = async (req, res) => {
  res.send("Delete Review Function Called");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
