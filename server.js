const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection String
// Replace <db_password> with Orko8899 as per your provided password
const mongoURI = "mongodb+srv://orkoofficial649_db_user:Orko8899@cluster0.usoryuv.mongodb.net/sora_collection?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log("SORA DB Connected successfully to MongoDB Atlas!"))
    .catch(err => console.error("DB Connection Error: ", err));

// Basic Route for Testing
app.get('/', (req, res) => {
    res.send("SORA Collection Backend is running on MongoDB Atlas!");
});

// Port Setup for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});