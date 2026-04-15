const mediaModel = require('../models/mediaModel');

async function getAllMedia(req, res) {
  try {
    const mediaList = await mediaModel.getAllMedia();
    res.render('admin/media/index', { mediaList });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

function getCreateMediaPage(req, res) {
  res.render('admin/media/create');
}

async function createMedia(req, res) {
  try {
    const { title, description, youtube_url, category } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    await mediaModel.createMedia(
      title,
      description,
      youtube_url,
      coverImage,
      category
    );

    res.redirect('/admin/media');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function getEditMediaPage(req, res) {
  try {
    const media = await mediaModel.getMediaById(req.params.id);

    if (!media) {
      return res.status(404).send('Media not found');
    }

    res.render('admin/media/edit', { media });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function updateMedia(req, res) {
  try {
    const { title, description, youtube_url, category } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    await mediaModel.updateMedia(
      req.params.id,
      title,
      description,
      youtube_url,
      coverImage,
      category
    );

    res.redirect('/admin/media');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function deleteMedia(req, res) {
  try {
    await mediaModel.deleteMedia(req.params.id);
    res.redirect('/admin/media');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  getAllMedia,
  getCreateMediaPage,
  createMedia,
  getEditMediaPage,
  updateMedia,
  deleteMedia
};