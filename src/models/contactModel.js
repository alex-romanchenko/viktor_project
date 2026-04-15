const db = require('../config/db');

async function getContacts() {
  const result = await db.query(`
    SELECT *
    FROM site_contacts
    ORDER BY id ASC
    LIMIT 1
  `);

  return result.rows[0];
}

async function updateContacts(phone, email) {
  const result = await db.query(`
    UPDATE site_contacts
    SET phone = $1,
        email = $2
    WHERE id = (
      SELECT id
      FROM site_contacts
      ORDER BY id ASC
      LIMIT 1
    )
    RETURNING *
  `, [phone, email]);

  return result.rows[0];
}

module.exports = {
  getContacts,
  updateContacts
};