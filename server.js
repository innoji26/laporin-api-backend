const express = require('express');
const cors = require('cors');
const database = require('./app/models/index.js');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const config = require('./app/config/cookiesConfig.js');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public/uploads', express.static('app/public/uploads'));
app.use(
  cookieSession({
    name: 'siklo-session',
    secret: config.secretKey,
    httpOnly: true,
  })
);

// define a simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Laporin API' });
  });
  require('./app/routes/user.js')(app);
  require('./app/routes/polisi.js')(app);
  require('./app/routes/auth.js')(app);
  require('./app/routes/laporan.js')(app);
  
  database.sequelize.sync({ force: false }).then(() => {
    console.log('re-sync db.');
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });