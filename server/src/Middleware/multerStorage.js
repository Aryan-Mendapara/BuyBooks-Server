const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ✅ 1. Define uploads directory (absolute path)
// On Render: __dirname is /opt/render/project/src/server/src
const uploadDir = path.join(__dirname, "../uploads");

// ✅ 2. Create the uploads folder if it doesn’t exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ 'uploads' folder created at:", uploadDir);
} else {
  console.log("📁 Using existing uploads folder:", uploadDir);
}

// ✅ 3. Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // absolute path
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// ✅ 4. Initialize Multer instance
const uploads = multer({ storage });

// ✅ 5. Export for routes
module.exports = uploads;
