const db = require('../config/db');

async function getAllMedia() {
  const result = await db.query(
    'SELECT * FROM media ORDER BY created_at DESC, id DESC'
  );
  return result.rows;
}

async function getMediaById(id) {
  const result = await db.query(
    'SELECT * FROM media WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function createMedia(title, description, youtubeUrl, coverImage, category) {
  const result = await db.query(
    `INSERT INTO media (title, description, youtube_url, cover_image, category)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, description, youtubeUrl, coverImage, category]
  );
  return result.rows[0];
}

async function updateMedia(id, title, description, youtubeUrl, coverImage, category) {
  const result = await db.query(
    `UPDATE media
     SET title = $1,
         description = $2,
         youtube_url = $3,
         cover_image = COALESCE($4, cover_image),
         category = $5
     WHERE id = $6
     RETURNING *`,
    [title, description, youtubeUrl, coverImage, category, id]
  );
  return result.rows[0];
}

async function deleteMedia(id) {
  await db.query('DELETE FROM media WHERE id = $1', [id]);
}

module.exports = {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia
};