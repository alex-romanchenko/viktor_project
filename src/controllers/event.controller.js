const eventModel = require('../models/eventModel');

async function showTourPage(req, res) {
  try {
    const events = await eventModel.getAllEvents();

    res.render('ua/tour', {
      events
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function showTourPageEn(req, res) {
  try {
    const events = await eventModel.getAllEvents();

    res.render('en/tour', {
      events
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  showTourPage,
  showTourPageEn
};