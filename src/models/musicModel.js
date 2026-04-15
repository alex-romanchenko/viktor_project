const db = require('../config/db');

async function getAllMusic() {
  const result = await db.query(
    'SELECT * FROM music ORDER BY created_at DESC, id DESC'
  );
  return result.rows;
}

async function getLatestMusic() {
  const result = await db.query(
    'SELECT * FROM music ORDER BY created_at DESC, id DESC LIMIT 1'
  );
  return result.rows[0];
}

async function getMusicById(id) {
  const result = await db.query(
    'SELECT * FROM music WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function createMusic(title, description, audio, coverImage, category) {
  const result = await db.query(
    `INSERT INTO music (title, description, audio, cover_image, category)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, description, audio, coverImage, category]
  );
  return result.rows[0];
}

async function updateMusic(id, title, description, audio, coverImage, category) {
  const result = await db.query(
    `UPDATE music
     SET title = $1,
         description = $2,
         audio = COALESCE($3, audio),
         cover_image = COALESCE($4, cover_image),
         category = $5
     WHERE id = $6
     RETURNING *`,
    [title, description, audio, coverImage, category, id]
  );
  return result.rows[0];
}

async function deleteMusic(id) {
  await db.query('DELETE FROM music WHERE id = $1', [id]);
}

module.exports = {
  getAllMusic,
  getLatestMusic,
  getMusicById,
  createMusic,
  updateMusic,
  deleteMusic
};