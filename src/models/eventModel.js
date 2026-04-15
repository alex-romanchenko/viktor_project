const db = require('../config/db');

async function getAllEvents() {
  const result = await db.query(
    'SELECT * FROM events ORDER BY date DESC, id DESC'
  );
  return result.rows;
}

async function getEventById(id) {
  const result = await db.query(
    'SELECT * FROM events WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function createEvent(title, city, place, date, time, description, ticketLink) {
  const result = await db.query(
    `INSERT INTO events (title, city, place, date, time, description, ticket_link)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [title, city, place, date, time, description, ticketLink]
  );
  return result.rows[0];
}

async function updateEvent(id, title, city, place, date, time, description, ticketLink) {
  const result = await db.query(
    `UPDATE events
     SET title = $1,
         city = $2,
         place = $3,
         date = $4,
         time = $5,
         description = $6,
         ticket_link = $7
     WHERE id = $8
     RETURNING *`,
    [title, city, place, date, time, description, ticketLink, id]
  );
  return result.rows[0];
}

async function deleteEvent(id) {
  await db.query('DELETE FROM events WHERE id = $1', [id]);
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};