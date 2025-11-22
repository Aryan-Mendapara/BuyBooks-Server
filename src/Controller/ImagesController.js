const { bucket } = require("../DBConnection/FirebaseConnection");
const { Image } = require("../Models/imagesModels");
const fs = require("fs");

const createBooks = async (req, res) => {
  try {
    console.log("📩 File received:", req.file);
    console.log("📦 Body received:", req.body);

    const { title, author, Publisher, price, originalPrice, discount, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Upload image to Firebase bucket
    const localFilePath = req.file.path;
    const firebaseFileName = `books/${Date.now()}-${req.file.originalname}`;
    const firebaseFile = bucket.file(firebaseFileName);

    await firebaseFile.save(fs.readFileSync(localFilePath), {
      metadata: { contentType: req.file.mimetype },
    });

    // Make file public
    await firebaseFile.makePublic();

    // Public Firebase URL
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${firebaseFileName}`;

    console.log("✅ Firebase Image URL:", imageUrl);

    // Save book
    const newBook = new Image({
      title,
      author,
      Publisher,
      price,
      originalPrice,
      discount,
      category,
      image: imageUrl,
    });

    await newBook.save();

    // Delete local upload
    fs.unlinkSync(localFilePath);

    res.status(201).json({ message: "Book created successfully", newBook });
  } catch (error) {
    console.error("🔥 Create Book Error:", error);
    res.status(500).json({ message: "Failed to create book", error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const books = await Image.find(query).sort({ createdAt: -1 });
    res.status(200).json({ message: "Books fetched successfully", books });
  } catch (error) {
    console.error("Get Books Error:", error);
    res.status(500).json({ message: "Failed to get books" });
  }
};

const deleteBooks = async (req, res) => {
  try {
    const books = await Image.findByIdAndDelete(req.params.id);
    if (!books) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete Books Error:", error);
    res.status(500).json({ message: "Failed to delete book" });
  }
};

module.exports = { createBooks, getBooks, deleteBooks };
