const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all readings with sensor type using JOIN
router.get('/', async function(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT sr.reading_id, sr.sensor_id, sr.reading_value, sr.reading_time, s.sensor_type " +
      "FROM Sensor_Reading sr " +
      "JOIN Sensor s ON sr.sensor_id = s.sensor_id " +
      "ORDER BY sr.reading_time DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching readings:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET latest 50 readings
router.get('/latest', async function(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT sr.reading_id, sr.sensor_id, sr.reading_value, sr.reading_time, s.sensor_type " +
      "FROM Sensor_Reading sr " +
      "JOIN Sensor s ON sr.sensor_id = s.sensor_id " +
      "ORDER BY sr.reading_time DESC LIMIT 50"
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching latest readings:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET reading stats - average, max, min for each sensor type
router.get('/stats', async function(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT s.sensor_type, " +
      "AVG(sr.reading_value) AS avg_val, " +
      "MAX(sr.reading_value) AS max_val, " +
      "MIN(sr.reading_value) AS min_val " +
      "FROM Sensor_Reading sr " +
      "JOIN Sensor s ON sr.sensor_id = s.sensor_id " +
      "GROUP BY s.sensor_type"
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching reading stats:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
