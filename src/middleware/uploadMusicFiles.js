const multer = require('multer');
const path = require('path');
const fs = require('fs');

const musicDir = path.join(__dirname, '..', '..', 'public', 'uploads', 'music');
const coversDir = path.join(__dirname, '..', '..', 'public', 'uploads', 'covers');

if (!fs.existsSync(musicDir)) {
  fs.mkdirSync(musicDir, { recursive: true });
}

if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'audio') {
      cb(null, musicDir);
    } else if (file.fieldname === 'cover_image') {
      cb(null, coversDir);
    } else {
      cb(new Error('Unknown field'));
    }
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'audio') {
    const allowedAudioTypes = ['audio/mpeg', 'audio/mp3'];

    if (allowedAudioTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error('Only mp3 files are allowed'), false);
  }

  if (file.fieldname === 'cover_image') {
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (allowedImageTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error('Only image files are allowed'), false);
  }

  cb(new Error('Unknown field'), false);
};

const uploadMusicFiles = multer({
  storage,
  fileFilter
});

module.exports = uploadMusicFiles;