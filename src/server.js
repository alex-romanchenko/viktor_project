const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const publicRoutes = require('./routes/public.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

const db = require('./config/db');

db.connect()
  .then(client => {
    console.log('PostgreSQL connected');
    client.release();
  })
  .catch(err => {
    console.error('PostgreSQL connection error:', err.message);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  res.locals.isAuth = !!req.session.user;
  res.locals.user = req.session.user || null;
  next();
});
app.get('/health', (req, res) => {
  res.status(200).send('ok');
});
app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
  });
}

module.exports = app;