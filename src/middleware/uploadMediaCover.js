const multer = require('multer');
const path = require('path');
const fs = require('fs');

const coversDir = path.join(__dirname, '..', '..', 'public', 'uploads', 'media');

if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, coversDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedImageTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(new Error('Only image files are allowed'), false);
};

const uploadMediaCover = multer({
  storage,
  fileFilter
});

module.exports = uploadMediaCover;