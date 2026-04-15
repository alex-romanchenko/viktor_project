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