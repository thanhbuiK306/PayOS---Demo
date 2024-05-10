const Order = require("../models/order-model");
const User = require("../models/user-model");
const Ebook = require("../models/ebook-model");
const validateMongoDbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");
var uniqid = require('uniqid'); 
const exampleUser = User.find().limit(1).exec();
const createOrder = asyncHandler(async (req, res) => {

  const order = await req.body.order
  const paymentMethod = req.body.paymentMethod;
  
  try {
    let user = await User.findOne().exec();
    const ebooks = await Promise.all(order.ebooks.map(async (ebook) => ({
      ebook: await Ebook.findById(ebook.id),
      name: ebook.name,
      price: ebook.promo_price,
      file: ebook.file
  })));
    let newOrder = await new Order({
      ebooks: ebooks,
      paymentIntent: {
        id: uniqid(),
        method: paymentMethod,
        amount: order.amount,
        status: "Pending",
        created: Date.now(),
        currency: "vnđ",
      },
      orderStatus: "Processing",
      email: user.email,
      name: user.name,
      phone: user.mobile,
      total: order.amount,
      totalQuantity: order.totalQuantity,
    }).save();
    console.log(newOrder)
    user = await User.findByIdAndUpdate(
      user._id,
      {
        $push: { orders: newOrder._id },
      },
      {
        new: true,
      }
    );

    const orderPopulate = await Order.findById(newOrder._id)
      .populate("ebooks.ebook")
      .exec();
    try {
      console.log("hehe")
      res.json(newOrder);
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByUserId = asyncHandler(async (req, res) => {
  const exampleUser = await User.findOne();
  const { _id } = exampleUser;
  console.log(_id)
  validateMongoDbId(_id);
  try {
    const userOrders = await User.findById(_id)
      .select("_id orders")
      .populate({
        path: "orders",
        select:
          "_id paymentIntent orderStatus total totalAfterDiscount ebooks createdAt",
        populate: {
          path: "ebooks.ebook",
          select: "_id title thumbnail",
        },
      })
      .exec();
    res.json(userOrders.orders);
  } catch (error) {
    throw new Error(error);
  }
});


const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.find({order_number : id}).limit(1)
      .populate("ebooks.ebook", "_id title thumbnail slug quantity")
      .exec();
    res.json(order[0]);
  } catch (error) {
    throw new Error(error);
  }
});


const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { status, method } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        paymentIntent: {
          method: method,
          status: status,
        },
      },
      { new: true }
    )
      .populate("ebooks.ebook")
      .exec();
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, method } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          method: method,
          status: status,
        },
      },
      { new: true }
    )
      .populate("ebooks.ebook")
      .exec();
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});



module.exports = {
  createOrder,
  getOrderByUserId,
  updateOrderStatus,
  updatePaymentStatus,
  updateOrder,
  getOrderById,
};