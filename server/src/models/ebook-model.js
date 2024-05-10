const mongoose = require("mongoose");

const ebookSchema = new mongoose.Schema(
    {   
        name: {
            type: String,
            required: [true, "Please provide a name"],
            trim: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        imageUrl: [
            {
            type: String,
            required: true,
            }],
        file: {
            type: String,
            required: [true, "Please provide a file"],
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Ebook", ebookSchema);