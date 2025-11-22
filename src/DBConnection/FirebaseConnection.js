const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccountPath = path.resolve("serviceAccount.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Firebase service account file not found!");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "buybooks-455e6.appspot.com", // ✅ your Firebase bucket name
    });
    console.log("🔥 Firebase connected successfully");
  } catch (error) {
    console.error("❌ Firebase connection error : ", error.message);
  }
}

const bucket = admin.storage().bucket();
module.exports = { bucket };
