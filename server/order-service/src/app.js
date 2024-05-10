const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const {order} = require('./api/order')

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.ORDER_SERVICE_PORT
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})
.on('error', (err) => {
    console.log(err);
    process.exit();
})

order(app);
