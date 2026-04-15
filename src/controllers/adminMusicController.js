const musicModel = require('../models/musicModel');

async function getAllMusic(req, res) {
  try {
    const musicList = await musicModel.getAllMusic();
    res.render('admin/music/index', { musicList });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

function getCreateMusicPage(req, res) {
  res.render('admin/music/create');
}

async function createMusic(req, res) {
  try {
    const { title, description, category } = req.body;

    const audio = req.files && req.files.audio ? req.files.audio[0].filename : null;
    const coverImage = req.files && req.files.cover_image ? req.files.cover_image[0].filename : null;

    if (!audio) {
      return res.status(400).send('Audio file is required');
    }

    await musicModel.createMusic(title, description, audio, coverImage, category);
    res.redirect('/admin/music');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function getEditMusicPage(req, res) {
  try {
    const music = await musicModel.getMusicById(req.params.id);

    if (!music) {
      return res.status(404).send('Music not found');
    }

    res.render('admin/music/edit', { music });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function updateMusic(req, res) {
  try {
    const { title, description, category } = req.body;

    const audio = req.files && req.files.audio ? req.files.audio[0].filename : null;
    const coverImage = req.files && req.files.cover_image ? req.files.cover_image[0].filename : null;

    await musicModel.updateMusic(req.params.id, title, description, audio, coverImage, category);
    res.redirect('/admin/music');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function deleteMusic(req, res) {
  try {
    await musicModel.deleteMusic(req.params.id);
    res.redirect('/admin/music');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  getAllMusic,
  getCreateMusicPage,
  createMusic,
  getEditMusicPage,
  updateMusic,
  deleteMusic
};