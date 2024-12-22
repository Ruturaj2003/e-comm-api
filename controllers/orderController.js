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
  const orders = await Order.find({});

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    throw new CustomError.NotFoundError("No such Order" + orderId);
  }

  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });

  if (!orders) {
    throw new CustomError.NotFoundError("No Orders from this User");
  }

  req.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    throw new CustomError.NotFoundError("No such Order" + orderId);
  }

  checkPermissions(req.user, order.user);
  order.paymentIntent = paymentIntentId;
  order.status = "paid";
  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
