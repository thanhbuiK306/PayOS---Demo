const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const path = require("path");

const Ebook = require('../models/ebook-model')
const getEbooks = asyncHandler( async (req, res, next) => {
    try {
        const ebooks = await Ebook.find();

        // Transforming the queried data
        const ebooksResponse = ebooks.map(ebook => { 
            return {
                "id": ebook._id,
                "name": ebook.name,
                "original_price": ebook.price,
                "promo_price": ebook.price * 0.72, // Assuming promo price is 72% of original price
                "promo_rate": 28, // Assuming a fixed promo rate of 28%
                "status": "Sắp có hàng", // Assuming this status for all eBooks
                "rating": ebook.rating,
                "poster": ebook.imageUrl[0], // Assuming there's always at least one imageUrl
                "best_seller": true, // Assuming this field's value for all eBooks
                "active": true
            };
        });
        res.status(200).json(ebooksResponse)
    } catch (error) {
        throw new Error(error);
    }
})

const addEbooks = asyncHandler( async (req, res, next) => {
    try {
        const reqBody = req.body;
        const ebookData = {
            "name": reqBody.name,
            "price": Number(reqBody.price),
            "description": reqBody.description,
            "imageUrl": [
                'https://nhasachmienphi.com/images/thumbnail/nhasachmienphi-good-luck-bi-mat-cua-may-man.jpg',
            ],
            "file": req.file.path  // Use req.file.path to access the uploaded file path
        };

        const newEbook = await Ebook.create(ebookData);
        console.log("Ebook created:", newEbook);

        res.json(newEbook);
    } catch (error) {
        console.error("Error creating ebook:", error);
        res.status(500).json({ error: "Could not add ebook" });
    }
})
const downloadEbook = asyncHandler(async (req, res, next) => {
    try {
        const ebook = await Ebook.findById(req.params.id);
        if (!ebook) {
            return res.status(404).send('This Ebook does not exist!');
        }
        const file = ebook.file;
        const filePath = path.join(__dirname, `../../${file}`);
        console.log(filePath)
        res.download(filePath);
    } catch (error) {
        next(error); 
    }
});

module.exports  = {
    getEbooks,
    addEbooks,
    downloadEbook
}