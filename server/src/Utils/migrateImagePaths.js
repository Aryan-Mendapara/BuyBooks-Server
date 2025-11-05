const dbConnection = require('../DBConnection/Connection');
const { Image } = require('../Models/booksModels');
const path = require('path');

(async () => {
  try {
    await dbConnection();
    console.log('Connected to DB — starting migration');

    const images = await Image.find({ image: { $exists: true, $ne: null } });
    console.log(`Found ${images.length} records with image field`);

    let updated = 0;
    for (const img of images) {
      const current = img.image;
      // if already a public path (/uploads/...), skip
      if (typeof current === 'string' && current.startsWith('/uploads/')) continue;
      if (!current) continue;

      // extract basename and construct public path
      const filename = path.basename(current);
      const publicPath = `/uploads/${filename}`;
      img.image = publicPath;
      await img.save();
      updated++;
      console.log(`Updated ${img._id} -> ${publicPath}`);
    }

    console.log(`Migration complete. Updated ${updated} records.`);
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();
