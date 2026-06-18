const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all sensors
router.get('/', async function(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM Sensor ORDER BY sensor_id');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching sensors:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET sensors for a specific toilet
router.get('/:toilet_id', async function(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Sensor WHERE toilet_id = ? ORDER BY sensor_id',
      [req.params.toilet_id]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching sensors for toilet:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
