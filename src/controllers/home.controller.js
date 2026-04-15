const newsModel = require('../models/news.model');
const musicModel = require('../models/musicModel');
const mediaModel = require('../models/mediaModel');
const eventModel = require('../models/eventModel');
const contactModel = require('../models/contactModel');

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

async function showHomePage(req, res) {
  try {
    console.log('HOME: start');

    console.log('HOME: news');
    const allNews = await newsModel.getAllNews();

    console.log('HOME: music');
    const allMusic = await musicModel.getAllMusic();

    console.log('HOME: media');
    const allMedia = await mediaModel.getAllMedia();

    console.log('HOME: events');
    const allEvents = await eventModel.getAllEvents();

    console.log('HOME: contacts');
    const contacts = await contactModel.getContacts();

    const latestNews = allNews.slice(0, 3);
    const latestTracks = allMusic.slice(0, 3);
    const latestMedia = allMedia.slice(0, 3);
    const latestEvents = allEvents.slice(0, 3);

    const preparedMedia = latestMedia.map((item) => ({
      ...item,
      embedUrl: getYoutubeEmbed(item.youtube_url)
    }));

    console.log('HOME: render');
    res.render('ua/index', {
      latestNews,
      latestTracks,
      latestMedia: preparedMedia,
      latestEvents,
      contacts
    });
  } catch (error) {
    console.error('HOME ERROR:', error);
    res.status(500).send('Server Error');
  }
}

async function showHomePageEn(req, res) {
  try {
    const allNews = await newsModel.getAllNews();
    const allMusic = await musicModel.getAllMusic();
    const allMedia = await mediaModel.getAllMedia();
    const allEvents = await eventModel.getAllEvents();
    const contacts = await contactModel.getContacts();

    const latestNews = allNews.slice(0, 3);
    const latestTracks = allMusic.slice(0, 3);
    const latestMedia = allMedia.slice(0, 3);
    const latestEvents = allEvents.slice(0, 3);

    const preparedMedia = latestMedia.map((item) => ({
      ...item,
      embedUrl: getYoutubeEmbed(item.youtube_url)
    }));

    res.render('en/index', {
      latestNews,
      latestTracks,
      latestMedia: preparedMedia,
      latestEvents,
      contacts
    });
  } catch (error) {
    console.error('HOME ERROR EN:', error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  showHomePage,
  showHomePageEn
};