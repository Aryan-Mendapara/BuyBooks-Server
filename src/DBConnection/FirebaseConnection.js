const admin = require("firebase-admin");

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error("❌ Firebase service account env variable not found!");
  process.exit(1);
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "buybooks-455e6.appspot.com",
  });
  console.log("🔥 Firebase connected successfully");
}

const bucket = admin.storage().bucket();
module.exports = { bucket };
