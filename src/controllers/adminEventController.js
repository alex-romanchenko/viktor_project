const eventModel = require('../models/eventModel');

async function getAllEvents(req, res) {
  try {
    const eventList = await eventModel.getAllEvents();
    res.render('admin/events/index', { eventList });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

function getCreateEventPage(req, res) {
  res.render('admin/events/create');
}

async function createEvent(req, res) {
  try {
    const { title, city, place, date, time, description, ticket_link } = req.body;

    await eventModel.createEvent(
      title,
      city,
      place,
      date,
      time,
      description,
      ticket_link
    );

    res.redirect('/admin/events');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function getEditEventPage(req, res) {
  try {
    const event = await eventModel.getEventById(req.params.id);

    if (!event) {
      return res.status(404).send('Event not found');
    }

    res.render('admin/events/edit', { event });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function updateEvent(req, res) {
  try {
    const { title, city, place, date, time, description, ticket_link } = req.body;

    await eventModel.updateEvent(
      req.params.id,
      title,
      city,
      place,
      date,
      time,
      description,
      ticket_link
    );

    res.redirect('/admin/events');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function deleteEvent(req, res) {
  try {
    await eventModel.deleteEvent(req.params.id);
    res.redirect('/admin/events');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  getAllEvents,
  getCreateEventPage,
  createEvent,
  getEditEventPage,
  updateEvent,
  deleteEvent
};