const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ইমেইল পাঠানোর কনফিগারেশন (Nodemailer)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soracollection.help@gmail.com', // আপনার দেওয়া জিমেইল
        pass: 'wcdx ryvm rjpn otsj'            // আপনার দেওয়া অ্যাপ পাসওয়ার্ড
    }
});

// হোম পেজ রুট (সার্ভার চেক করার জন্য)
app.get('/', (req, res) => {
    res.status(200).send(`
        <div style="text-align: center; padding-top: 100px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <h1 style="color: #ec407a;">🌸 SORA Collection Backend 🌸</h1>
            <p style="color: #555;">সার্ভার সচল আছে এবং ইমেইল সিস্টেম সেটআপ করা হয়েছে।</p>
            <div style="margin-top: 20px; padding: 10px; background: #fce4ec; display: inline-block; border-radius: 10px;">
                Status: <strong>Active</strong>
            </div>
        </div>
    `);
});

// অর্ডার রিসিভ করার রুট
app.post('/api/order', (req, res) => {
    const orderData = req.body;
    
    console.log("New Order Received:", orderData);

    // আপনার ইমেইলে যেভাবে অর্ডারটি দেখাবে (Email Template)
    const mailOptions = {
        from: '"SORA Collection" <soracollection.help@gmail.com>',
        to: 'soracollection.help@gmail.com', // আপনি নিজেই নিজের ইমেইলে অর্ডার রিসিভ করবেন
        subject: `নতুন অর্ডার: ${orderData.fullName || 'Customer'}`,
        html: `
            <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                <h2 style="color: #ec407a; border-bottom: 2px solid #ec407a; padding-bottom: 10px;">নতুন অর্ডারের বিস্তারিত</h2>
                <p><strong>নাম:</strong> ${orderData.fullName}</p>
                <p><strong>ফোন নাম্বার:</strong> ${orderData.phone}</p>
                <p><strong>ঠিকানা:</strong> ${orderData.address}</p>
                <p><strong>পণ্যের নাম:</strong> ${orderData.productName}</p>
                <p><strong>মোট মূল্য:</strong> ${orderData.totalPrice} BDT</p>
                <br>
                <p style="font-size: 12px; color: #888;">এটি ওয়েবসাইট থেকে অটোমেটিক পাঠানো মেসেজ।</p>
            </div>
        `
    };

    // ইমেইল পাঠানোর প্রক্রিয়া
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Email Error:", error);
            return res.status(500).json({ 
                success: false, 
                message: "অর্ডার রিসিভ হয়েছে কিন্তু ইমেইল পাঠানো যায়নি।" 
            });
        }
        console.log("Email Sent Successfully: " + info.response);
        res.status(200).json({ 
            success: true, 
            message: "অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে এবং ইমেইল পাঠানো হয়েছে!" 
        });
    });
});

// Render-এর জন্য পোর্ট সেটআপ
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`SORA Server is running on port ${PORT}`);
});