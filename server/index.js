require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const dbConnection = require("./src/DBConnection/Connection.js");
const index = require('./src/Routes/main.js');

const app = express();
const port = process.env.PORT || 8000;

// ✅ CORS FIRST (before any middleware)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://buy-books-twpo.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serve
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Main routes
app.use("/books", index);

// DB + Server start
dbConnection();
app.listen(port, () => console.log("Server started on port", port));
