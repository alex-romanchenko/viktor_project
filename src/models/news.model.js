const db = require('../config/db');

async function getAllNews() {
  const result = await db.query(`
    SELECT *
    FROM news
    ORDER BY created_at DESC
  `);

  return result.rows;
}

async function getAllNewsByLocale(locale) {
  const result = await db.query(`
    SELECT *
    FROM news
    WHERE locale = $1
    ORDER BY created_at DESC, id DESC
  `, [locale]);

  return result.rows;
}

async function getNewsById(id) {
  const result = await db.query(`
    SELECT *
    FROM news
    WHERE id = $1
  `, [id]);

  return result.rows[0];
}

async function getNewsBySlug(slug) {
  const result = await db.query(`
    SELECT *
    FROM news
    WHERE slug = $1
  `, [slug]);

  return result.rows[0];
}

async function getNewsBySlugAndLocale(slug, locale) {
  const result = await db.query(`
    SELECT *
    FROM news
    WHERE slug = $1 AND locale = $2
  `, [slug, locale]);

  return result.rows[0];
}

async function createNews(title, slug, excerpt, content, image, locale) {
  const result = await db.query(`
    INSERT INTO news (title, slug, excerpt, content, image, locale)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [title, slug, excerpt, content, image, locale]);

  return result.rows[0];
}

async function updateNewsById(id, { title, slug, excerpt, content, image, locale }) {
  const result = await db.query(`
    UPDATE news
    SET title = $1,
        slug = $2,
        excerpt = $3,
        content = $4,
        image = $5,
        locale = $6
    WHERE id = $7
    RETURNING *
  `, [title, slug, excerpt, content, image, locale, id]);

  return result.rows[0];
}

async function deleteNewsById(id) {
  const result = await db.query(`
    DELETE FROM news
    WHERE id = $1
    RETURNING *
  `, [id]);

  return result.rows[0];
}

module.exports = {
  getAllNews,
  getAllNewsByLocale,
  getNewsById,
  getNewsBySlug,
  getNewsBySlugAndLocale,
  createNews,
  updateNewsById,
  deleteNewsById
};