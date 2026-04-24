const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send("SORA Backend is Live (Database connection removed)!");
});

// Order Route (ডাটাবেস ছাড়াই কাজ করবে)
app.post('/api/order', (req, res) => {
    console.log("Received Order:", req.body);
    res.status(200).json({ 
        success: true, 
        message: "Order received successfully!" 
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});