const app = require('./src/server');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`App started on port ${PORT}`);
});