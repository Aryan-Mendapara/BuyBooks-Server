// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null,Date.now() + '-' + file.originalname)
//     },
// });

// const uploads = multer({ storage });

// module.exports = uploads

const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Define the uploads directory (absolute path)
const uploadDir = path.join(__dirname, "uploads");

// Create the uploads folder if it doesn’t exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ 'uploads' folder created at:", uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // use the absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize the multer instance
const uploads = multer({ storage });

module.exports = uploads;
