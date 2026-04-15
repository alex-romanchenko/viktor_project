const contactModel = require('../models/contactModel');

async function getContactsPage(req, res) {
  try {
    const contacts = await contactModel.getContacts();

    res.render('admin/contacts', {
      contacts,
      error: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function updateContacts(req, res) {
  try {
    const { phone, email } = req.body;

    if (!phone || !email) {
      const contacts = await contactModel.getContacts();

      return res.render('admin/contacts', {
        contacts,
        error: 'Заповни телефон і email'
      });
    }

    await contactModel.updateContacts(phone, email);

    res.redirect('/admin/contacts');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  getContactsPage,
  updateContacts
};