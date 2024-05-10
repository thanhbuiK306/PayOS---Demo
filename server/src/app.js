const express = require('express');
const morgan = require("morgan");
const https = require("https");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const {MongoConnect}  = require('./database/mongo-connect');


const ebookRouter = require('./routes/ebook-route')
const paymentRouter = require("./routes/payment-route");
const orderRouter = require("./routes/order-route");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.EBOOK_SERVICE_PORT || 6020
MongoConnect();


app.use(cookieParser());

app.use("/api/ebook", ebookRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})
.on('error', (err) => {
    console.log(err);
    process.exit();
})


