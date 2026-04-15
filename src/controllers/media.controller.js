const mediaModel = require('../models/mediaModel');

function getYoutubeEmbed(url) {
  if (!url) return '';

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) {
    return url;
  }

  return '';
}

async function showMediaPage(req, res) {
  try {
    const mediaList = await mediaModel.getAllMedia();

    const preparedMedia = mediaList.map((item) => ({
      ...item,
      embedUrl: getYoutubeEmbed(item.youtube_url)
    }));

    res.render('ua/media', {
      mediaList: preparedMedia
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function showMediaPageEn(req, res) {
  try {
    const mediaList = await mediaModel.getAllMedia();

    const preparedMedia = mediaList.map((item) => ({
      ...item,
      embedUrl: getYoutubeEmbed(item.youtube_url)
    }));

    res.render('en/media', {
      mediaList: preparedMedia
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  showMediaPage,
  showMediaPageEn
};