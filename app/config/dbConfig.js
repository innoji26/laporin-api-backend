require('dotenv').config();

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  pass: process.env.PASS,
  db: process.env.DATABASE,
  dialect: 'mysql',
};

module.exports = config;
