const express = require('express');
const router = express.Router();

const newsController = require('../controllers/news.controller');
const musicController = require('../controllers/music.controller');
const mediaController = require('../controllers/media.controller');
const eventController = require('../controllers/event.controller');
const homeController = require('../controllers/home.controller');
console.log('homeController =', homeController);
const contactController = require('../controllers/contact.controller');
// redirect root
router.get('/', (req, res) => {
  res.redirect('/ua');
});

// UA
router.get('/ua', homeController.showHomePage);
router.get('/ua/', homeController.showHomePage);

router.get('/ua/news', newsController.showNewsList);
router.get('/ua/news/:slug', newsController.showSingleNews);

router.get('/ua/bio', (req, res) => {
  res.render('ua/bio');
});

router.get('/ua/music', musicController.showMusicPage);
router.get('/ua/media', mediaController.showMediaPage);
router.get('/ua/tour', eventController.showTourPage);

router.get('/ua/contacts', contactController.showContactsPage);

// EN
router.get('/en', homeController.showHomePageEn);
router.get('/en/', homeController.showHomePageEn);

router.get('/en/news', newsController.showNewsListEn);
router.get('/en/news/:slug', newsController.showSingleNewsEn);

router.get('/en/bio', (req, res) => {
  res.render('en/bio');
});

router.get('/en/music', musicController.showMusicPageEn);
router.get('/en/music/', musicController.showMusicPageEn);

router.get('/en/media', mediaController.showMediaPageEn);
router.get('/en/media/', mediaController.showMediaPageEn);

router.get('/en/tour', eventController.showTourPageEn);
router.get('/en/tour/', eventController.showTourPageEn);

router.get('/en/contacts', contactController.showContactsPageEn);

module.exports = router;