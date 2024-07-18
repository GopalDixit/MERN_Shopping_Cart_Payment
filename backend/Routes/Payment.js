const express = require('express');
const router = express.Router(); 
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const crypto = require('crypto');
const PaymentModel = require('../Models/Payment');
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

router.post('/order', (req, res) => {
    const { amount } = req.body;
    try {
        const options = {
            amount: Number(amount) * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        };
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Something went wrong' });
            }
            console.log(order);
            res.status(200).json({ data: order });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {
            const payment = new PaymentModel({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            await payment.save();

            res.json({
                message: "Payment Successfully"
            });
        } else {
            res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
});

module.exports = router;
