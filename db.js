const postgres = require('postgres');
const config = require('./config');

const sql = postgres({
  host: config.database.host,
  port: config.database.port,
  database: config.database.database,
  username: config.database.username,
  password: config.database.password,
});

module.exports = sql;