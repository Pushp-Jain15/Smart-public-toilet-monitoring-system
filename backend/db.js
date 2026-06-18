const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'aayushi21',              // Leave empty for no password
  database: 'toilet_monitoring_db',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = { pool };
