const { Image } = require("../Models/imagesModels");
const { bucket } = require("../DBConnection/firebaseconfig");
const fs = require("fs");

const createBooks = async (req, res) => {
  try {
    console.log("📩 File received:", req.file);
    console.log("📦 Body received:", req.body);

    const { title, author, Publisher, price, originalPrice, discount, category } = req.body;

    if (!req.file) {
      console.log("❌ No image file received");
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = req.file.path; // Cloudinary gives the URL here
    console.log("✅ Cloudinary URL:", imageUrl);

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
    console.log("✅ Book saved successfully");

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
