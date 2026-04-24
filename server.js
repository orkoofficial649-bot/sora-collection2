const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // ইমেইল পাঠানোর জন্য

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ডাটাবেস কানেকশন আমরা এখন করছি না

// Test Route
app.get('/', (req, res) => {
    res.send("SORA Backend is running (Without Database)!");
});

// অর্ডার রিসিভ করার রুট
app.post('/api/order', (req, res) => {
    const orderData = req.body;
    
    // এখানে আমরা শুধু কনসোলে প্রিন্ট করছি
    console.log("New Order Received:", orderData);
    
    // ডাটাবেস ছাড়াই সাকসেস মেসেজ পাঠানো
    res.status(200).json({ 
        success: true, 
        message: "অর্ডারটি গ্রহণ করা হয়েছে (ডাটাবেস ছাড়াই)" 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});