const { Image } = require("../Models/booksModels");
const path = require('path');
const fs = require('fs');

const createBooks = async (req, res) => {
	try {
		const { title, author, Publisher, price, originalPrice, discount, category } = req.body;

		// Store a public URL for the uploaded image so the frontend can request it.
		// Multer provides req.file.filename when using diskStorage; fall back to basename(req.file.path).
		const filename = req.file ? (req.file.filename || path.basename(req.file.path)) : null;
		const image = filename ? `/uploads/${filename}` : null;
		console.log("Form data received:", req.body);

		const newBooks = new Image({
			title,
			author,
			image,
			Publisher,
			price,
			originalPrice,
			discount,
			category,
		});

		await newBooks.save();

		res.status(201).json({ message: 'Book created successfully', newBooks });
	} catch (error) {
		console.error("Create Book Error: ", error);
		res.status(500).json({ message: 'Failed to create book', error: error.message });
	}
};

const getBooks = async (req, res) => {
	try {
		const { category } = req.query;
		const query = category ? { category } : {};
		const books = await Image.find(query).sort({ createdAt: -1 });
		res.status(200).json({ message: 'Books fetched successfully', books });
	} catch (error) {
		console.error('Get Books Error:', error);
		res.status(500).json({ message: 'Failed to get books' });
	}
};

const deleteBooks = async (req, res) => {
	try {
		const books = await Image.findByIdAndDelete(req.params.id);
		if (!books) {
			return res.status(404).json({ message: 'Book not found' });
		}

		// Attempt to delete the image file from disk. `books.image` is stored as '/uploads/<filename>'.
		if (books.image) {
			try {
				const publicPath = books.image.startsWith('/') ? books.image.slice(1) : books.image; // remove leading '/'
				const diskPath = path.resolve(__dirname, '..', '..', publicPath);
				if (fs.existsSync(diskPath)) {
					fs.unlink(diskPath, (err) => {
						if (err) console.error('Error deleting image:', err);
					});
				}
			} catch (err) {
				console.error('Failed to delete image file:', err);
			}
		}

		res.status(200).json({ message: 'Book deleted successfully' });
	} catch (error) {
		console.error('Delete Books Error:', error);
		res.status(500).json({ message: 'Failed to delete book' });
	}
};

module.exports = { createBooks, getBooks, deleteBooks };