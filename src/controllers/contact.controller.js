const contactModel = require('../models/contactModel');

async function showContactsPage(req, res) {
  try {
    const contacts = await contactModel.getContacts();

    res.render('ua/contacts', {
      contacts
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function showContactsPageEn(req, res) {
  try {
    const contacts = await contactModel.getContacts();

    res.render('en/contacts', {
      contacts
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  showContactsPage,
  showContactsPageEn
};