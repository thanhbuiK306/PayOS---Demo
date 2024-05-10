const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    order_number: { type: Number, unique: true },
    ebooks: [
      {
        ebook: {
          type: mongoose.Types.ObjectId,
          ref: "Ebook",
        },
        name: String,
        price: Number,
        file: String
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Processing",
      enum: [
        "Processing",
        "Cancelled",
        "Processed",
      ],
    },
    email: String,
    name: String,
    phone: String,
    total: Number,
    totalQuantity: Number,
  },
  {
    timestamps: true,
  }
);
orderSchema.statics.getNextOrderId = async function () {
  const order = await this.findOne().sort({ order_number: -1 });
  const nextordernumber = order ? order.order_number + 1 : 2;
  return nextordernumber;
};

orderSchema.pre("save", async function (next) {
  if (!this.order_number) {
    this.order_number = await this.constructor.getNextOrderId();
  }
  next();
});
//Export the model
module.exports = mongoose.model("Order", orderSchema);