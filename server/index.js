require('dotenv').config();
const express = require("express");
const dbConnection = require("./src/DBConnection/Connection.js");
const index = require('./src/Routes/main.js');
const cors = require("cors");
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: ["http://localhost:5173", 
            "https://buybooks-client.vercel.app",
            "https://buy-books-twpo.vercel.app"
          ], // allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.options("*", cors());

app.use(express.json());

// Middleware
app.use(express.urlencoded({ extended: true }));

// Serve images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/books", index);

dbConnection();
app.listen(port, () => {
  console.log("Server start", port);
})