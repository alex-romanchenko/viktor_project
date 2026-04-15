const express = require('express');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const newsController = require('../controllers/news.controller');
const adminMusicController = require('../controllers/adminMusicController');
const uploadMusicFiles = require('../middleware/uploadMusicFiles');
const router = express.Router();
const adminMediaController = require('../controllers/adminMediaController');
const uploadMediaCover = require('../middleware/uploadMediaCover');
const adminContactController = require('../controllers/adminContactController');
const ADMIN_LOGIN = process.env.ADMIN_LOGIN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const passwordHashPromise = bcrypt.hash(ADMIN_PASSWORD, 10);
const uploadNewsImage = require('../middleware/uploadNewsImage');
const adminEventController = require('../controllers/adminEventController');

router.get('/events', auth, adminEventController.getAllEvents);
router.get('/events/create', auth, adminEventController.getCreateEventPage);
router.post('/events/create', auth, adminEventController.createEvent);

router.get('/events/edit/:id', auth, adminEventController.getEditEventPage);
router.post('/events/edit/:id', auth, adminEventController.updateEvent);

router.post('/events/delete/:id', auth, adminEventController.deleteEvent);
router.get('/contacts', auth, adminContactController.getContactsPage);
router.post('/contacts', auth, adminContactController.updateContacts);
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/admin');
  }

  res.render('admin/login', { error: null });
});

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.render('admin/login', { error: 'Заповни логін і пароль' });
    }

    if (login !== ADMIN_LOGIN) {
      return res.render('admin/login', { error: 'Невірний логін або пароль' });
    }

    const passwordHash = await passwordHashPromise;
    const isMatch = await bcrypt.compare(password, passwordHash);

    if (!isMatch) {
      return res.render('admin/login', { error: 'Невірний логін або пароль' });
    }

    req.session.user = { login };
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.render('admin/login', { error: 'Помилка сервера' });
  }
});

router.get('/', auth, (req, res) => {
  res.render('admin/dashboard');
});

router.get('/news', auth, newsController.showAdminNewsList);
router.get('/news/create', auth, newsController.showCreateNewsForm);
router.post('/news/create', auth, uploadNewsImage.single('imageFile'), newsController.createNews);

router.post('/news/edit/:id', auth, uploadNewsImage.single('imageFile'), newsController.updateNews);
router.get('/news/edit/:id', auth, newsController.showEditNewsForm);
router.post('/news/delete/:id', auth, newsController.deleteNews);
router.get('/music', auth, adminMusicController.getAllMusic);
router.get('/music/create', auth, adminMusicController.getCreateMusicPage);

router.post(
  '/music/create',
  auth,
  uploadMusicFiles.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'cover_image', maxCount: 1 }
  ]),
  adminMusicController.createMusic
);

router.get('/music/edit/:id', auth, adminMusicController.getEditMusicPage);

router.post(
  '/music/edit/:id',
  auth,
  uploadMusicFiles.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'cover_image', maxCount: 1 }
  ]),
  adminMusicController.updateMusic
);

router.post('/music/delete/:id', auth, adminMusicController.deleteMusic);

router.post(
  '/news/edit/:id',
  auth,
  uploadNewsImage.single('imageFile'),
  newsController.updateNews
);

// MEDIA

router.get('/media', auth, adminMediaController.getAllMedia);

router.get('/media/create', auth, adminMediaController.getCreateMediaPage);

router.post(
  '/media/create',
  auth,
  uploadMediaCover.single('cover_image'),
  adminMediaController.createMedia
);

router.get('/media/edit/:id', auth, adminMediaController.getEditMediaPage);

router.post(
  '/media/edit/:id',
  auth,
  uploadMediaCover.single('cover_image'),
  adminMediaController.updateMedia
);

router.post('/media/delete/:id', auth, adminMediaController.deleteMedia);

router.post('/logout', auth, (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

module.exports = router;