const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Ebook" }],
    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("User", userSchema);