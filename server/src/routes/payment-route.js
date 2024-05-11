const express = require("express");
const router = express.Router();

const PayOS = require("@payos/node");
require('dotenv').config();
const payos = new PayOS(process.env.PAYOS_CLIENT_ID, process.env.PAYOS_API_KEY, process.env.PAYOS_CHECKSUM_KEY);

router.post('/create-payment', async(req, res, next) => {

    const {orderCode, description,
        ebooks,
        total, 
    returnUrl,
    cancelUrl,
    buyerName,
    buyerEmail,
    buyerPhone} = req.body

    const order = {
        orderCode: orderCode,
        amount: total,
        description: description,
        cancelUrl: cancelUrl,
        returnUrl: returnUrl,
        items: ebooks,
        buyerName: buyerName,
        buyerEmail: buyerEmail,
        buyerPhone: buyerPhone,
        // buyerAddress?: string;
        expiredAt: Math.floor((Date.now() + 15*60*1000)/1000)
    }

    try {
        const paymentLink = await payos.createPaymentLink(order);
        return res.json(paymentLink)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error });
    }
})

module.exports = router;