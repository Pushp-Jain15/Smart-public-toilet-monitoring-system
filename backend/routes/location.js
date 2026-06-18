const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all locations
router.get('/', async function(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM Location ORDER BY location_id');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching locations:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST new location
router.post('/', async function(req, res) {
  try {
    const { area_name, city, pincode } = req.body;
    await pool.query(
      'INSERT INTO Location (area_name, city, pincode) VALUES (?, ?, ?)',
      [area_name, city, pincode]
    );
    res.status(201).json({ message: 'Location added successfully' });
  } catch (err) {
    console.error('Error adding location:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
