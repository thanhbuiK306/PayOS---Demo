const express = require("express");

const {
  createOrder,
  getOrderByUserId,
  updateOrderStatus,
  updatePaymentStatus,
  getOrderById,
} = require("../controllers/order-controller");

const router = express.Router();

router.post("/create-order",  createOrder);
router.get("/:id", getOrderById);
router.get("/get-user-order",  getOrderByUserId);
router.put("/update-payment/:id",  updatePaymentStatus);
router.put("/update-order-status/:id", updateOrderStatus);

module.exports = router;