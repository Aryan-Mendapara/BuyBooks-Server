require('dotenv').config();
const express = require("express");
const dbConnection = require("./src/DBConnection/MongoDBConnection.js");
const index = require('./src/Routes/main.js');
const cors = require("cors");
const path = require('path');
require('./src/DBConnection/FirebaseConnection.js'); // Firebase Admin SDK

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: ["http://localhost:5173", "https://buy-books-4mj7.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder (for old local uploads)
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploads", express.static("uploads"));

app.use("/books", index);

dbConnection();

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
