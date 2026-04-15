const express = require('express');
const router = express.Router();

const adminMusicController = require('../controllers/adminMusicController');
const uploadMusic = require('../middlewares/uploadMusic');
const uploadCover = require('../middlewares/uploadCover');
const isAdmin = require('../middlewares/isAdmin');
const multer = require('multer');

const combinedUpload = multer().fields([]);

router.get('/', isAdmin, adminMusicController.getAllMusic);
router.get('/create', isAdmin, adminMusicController.getCreateMusicPage);

router.post(
  '/create',
  isAdmin,
  function (req, res, next) {
    uploadMusic.fields([{ name: 'audio', maxCount: 1 }])(req, res, function (err) {
      if (err) return next(err);

      uploadCover.fields([{ name: 'cover_image', maxCount: 1 }])(req, res, function (err) {
        if (err) return next(err);
        next();
      });
    });
  },
  adminMusicController.createMusic
);

router.get('/edit/:id', isAdmin, adminMusicController.getEditMusicPage);

router.post(
  '/edit/:id',
  isAdmin,
  function (req, res, next) {
    uploadMusic.fields([{ name: 'audio', maxCount: 1 }])(req, res, function (err) {
      if (err) return next(err);

      uploadCover.fields([{ name: 'cover_image', maxCount: 1 }])(req, res, function (err) {
        if (err) return next(err);
        next();
      });
    });
  },
  adminMusicController.updateMusic
);

router.post('/delete/:id', isAdmin, adminMusicController.deleteMusic);

module.exports = router;