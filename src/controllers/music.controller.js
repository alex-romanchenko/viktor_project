const musicModel = require('../models/musicModel');

async function showMusicPage(req, res) {
  try {
    const tracks = await musicModel.getAllMusic();
    const latestTrack = await musicModel.getLatestMusic();

    res.render('ua/music', {
      tracks,
      latestTrack
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function showMusicPageEn(req, res) {
  try {
    const tracks = await musicModel.getAllMusic();
    const latestTrack = await musicModel.getLatestMusic();

    res.render('en/music', {
      tracks,
      latestTrack
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  showMusicPage,
  showMusicPageEn
};