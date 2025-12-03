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

// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// // Define the uploads directory (absolute path)
// const uploadDir = path.join(__dirname, "uploads");
// console.log("📸 Upload directory:", uploadDir);

// // Create the uploads folder if it doesn’t exist
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log("✅ 'uploads' folder created at:", uploadDir);
// }

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir); // use the absolute path
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// // Initialize the multer instance
// const uploads = multer({ storage });

// module.exports = uploads;

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const uploadDir = path.join(__dirname, "../../uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log("📁 Created uploads folder:", uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const uploads = multer({ storage });

// module.exports = uploads;

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// POST Route
router.post("/images/import", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: filePath
    });
  } catch (error) {
    console.log("Upload error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
