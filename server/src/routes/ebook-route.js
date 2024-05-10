const express = require("express");
const upload = require("../middlewares/multer");
const router = express.Router();

const {
    getEbooks,
    addEbooks,
    downloadEbook
} = require('../controllers/ebook-controller');
router.post("/", upload.single("file"), addEbooks);
router.get("/", getEbooks);
router.get('/download/:id', downloadEbook )

module.exports = router;