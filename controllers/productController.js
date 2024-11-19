const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({
    _id: productId,
  });

  res.status(StatusCodes.OK).json(product);
  res.send("Get Single Product Function Called");
};
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new CustomError.NotFoundError("No such Product");
  }

  res.status(StatusCodes.OK).json(product);
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({
    _id: productId,
  });

  if (!product) {
    throw new CustomError.NotFoundError("No such Product");
  }

  await product.remove();
  res.status(StatusCodes.OK).json("Deleted");
};
const uploadImage = (req, res) => {
  res.send("Upload Image Function Called");
};
module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
