const cloudinary = require('cloudinary').v2;
const path = require('path');

// Validate environment variables
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Missing Cloudinary credentials.');
  throw new Error('Cloudinary configuration incomplete.');
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (fileBuffer, filename) => {
  try {
    const ext = path.extname(filename).toLowerCase();
    if (!['.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
      throw new Error('Invalid file type. Only JPG, JPEG, WEBP, GIF allowed.');
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (fileBuffer.length > maxSize) {
      throw new Error('File size exceeds 10MB.');
    }

    console.log(`Uploading: ${filename}`);
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'comic-tshirts',
          public_id: path.basename(filename, path.extname(filename)),
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' } // Optimize format (e.g., .webp for modern browsers)
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(fileBuffer);
    });

    console.log(`Uploaded: ${result.secure_url}`);
    return { url: result.secure_url, public_id: result.public_id };
  } catch (err) {
    console.error(`Cloudinary error for ${filename}:`, err.message);
    throw new Error(`Cloudinary upload failed: ${err.message}`);
  }
};

module.exports = { uploadImage };