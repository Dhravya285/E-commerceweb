const cloudinary = require('cloudinary').v2;

// Validate Cloudinary configuration
const validateConfig = () => {
  const requiredEnvVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    throw new Error(`Missing Cloudinary environment variables: ${missingVars.join(', ')}`);
  }
};

// Configure Cloudinary
try {
  validateConfig();
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (error) {
  console.error('Cloudinary configuration error:', error.message);
  throw error;
}

// Accepts a buffer and original filename
const uploadImage = (fileBuffer, originalname) => {
  return new Promise((resolve, reject) => {
    // Validate inputs
    if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
      return reject(new Error('Invalid or missing file buffer'));
    }
    if (!originalname) {
      return reject(new Error('Original filename is required'));
    }

    // Check file size (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (fileBuffer.length > maxSize) {
      return reject(new Error(`File size exceeds limit of ${maxSize / (1024 * 1024)}MB`));
    }

    // Validate file type based on extension
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = (originalname.match(/\.([a-zA-Z0-9]+)$/) || [])[1]?.toLowerCase();
    if (!ext || !allowedExtensions.includes(`.${ext}`)) {
      return reject(new Error(`Unsupported file type. Allowed: ${allowedExtensions.join(', ')}`));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'ecommerce/products',
        resource_type: 'image',
        public_id: originalname.split('.')[0],
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', {
            message: error.message,
            status: error.http_code,
            details: error
          });
          reject(new Error(`Failed to upload image to Cloudinary: ${error.message}`));
        } else {
          resolve({ url: result.secure_url, public_id: result.public_id });
        }
      }
    );

    stream.on('error', (streamError) => {
      console.error('Stream error during Cloudinary upload:', streamError);
      reject(new Error(`Stream error during upload: ${streamError.message}`));
    });

    stream.end(fileBuffer);
  });
};

module.exports = { uploadImage };