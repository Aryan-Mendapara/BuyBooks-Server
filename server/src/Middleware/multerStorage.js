const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ✅ Define uploads directory relative to root (not inside src/)
const uploadDir = path.join(__dirname, "../../uploads");

// ✅ Ensure the uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ 'uploads' folder created at:", uploadDir);
}

// ✅ Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

module.exports = uploads;
