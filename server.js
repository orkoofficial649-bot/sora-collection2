const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path'); // এটি ফাইল দেখানোর জন্য লাগবে

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// আপনার HTML, CSS ফাইলগুলো যে ফোল্ডারে আছে সেটাকে 'static' করা
// যদি ফাইলগুলো সরাসরি মূল ফোল্ডারে থাকে তবে নিচের লাইনটি কাজ করবে
app.use(express.static(path.join(__dirname, './')));

// ইমেইল পাঠানোর কনফিগারেশন
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soracollection.help@gmail.com',
        pass: 'wcdx ryvm rjpn otsj'
    }
});

// মূল লিঙ্কে গেলে index.html ফাইলটি দেখাবে
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// অর্ডার রিসিভ করার রুট
app.post('/api/order', (req, res) => {
    const orderData = req.body;
    console.log("New Order Received:", orderData);

    const mailOptions = {
        from: '"SORA Collection" <soracollection.help@gmail.com>',
        to: 'soracollection.help@gmail.com',
        subject: `নতুন অর্ডার: ${orderData.fullName || 'Customer'}`,
        html: `
            <div style="font-family: Arial; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                <h2 style="color: #ec407a;">নতুন অর্ডারের বিস্তারিত</h2>
                <p><strong>নাম:</strong> ${orderData.fullName}</p>
                <p><strong>ফোন:</strong> ${orderData.phone}</p>
                <p><strong>ঠিকানা:</strong> ${orderData.address}</p>
                <p><strong>পণ্য:</strong> ${orderData.productName}</p>
                <p><strong>মূল্য:</strong> ${orderData.totalPrice} BDT</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false });
        }
        res.status(200).json({ success: true });
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});