const Product = require("../models/Product");
const Order = require("../models/Order");

const checkPermissions = require("../utils/checkPermissions");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "DotaizzOP";
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.lenght < 1) {
    throw new CustomError.BadRequestError("No Cart Items");
  }

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError("Please Provide Tax And Shiping Fee");
  }

  let orderItems = [];
  let subtotal = 0;

  // For of Loop bcz it supports await in it
  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });

    if (!dbProduct) {
      throw new CustomError.NotFoundError("No such Product " + item.product);
    }

    const { name, price, image, _id } = dbProduct;

    console.log(name, price, image);

    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    // Add items to order

    orderItems = [...orderItems, singleOrderItem];
    // Calc sub total
    subtotal += price * item.amount;
    console.log(subtotal);
  }
  const total = tax + shippingFee + subtotal;
  // Get CLient Sec
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "USD",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ clientSecret: order.clientSecret });
};
const getAllOrders = async (req, res) => {
  res.send("get all order");
};
const getSingleOrder = async (req, res) => {
  res.send("get single order");
};
const getCurrentUserOrders = async (req, res) => {
  res.send("get current user orders");
};
const updateOrder = async (req, res) => {
  res.send("update  order");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
