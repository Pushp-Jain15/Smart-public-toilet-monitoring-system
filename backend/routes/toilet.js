const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all toilets with location name
router.get('/', async function(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT t.*, l.area_name FROM Toilet t JOIN Location l ON t.location_id = l.location_id ORDER BY t.toilet_id'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching toilets:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET active toilets
router.get('/active', async function(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT t.*, l.area_name FROM Toilet t JOIN Location l ON t.location_id = l.location_id WHERE t.status = 'Active' ORDER BY t.toilet_id"
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching active toilets:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET toilets under maintenance
router.get('/maintenance', async function(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT t.*, l.area_name FROM Toilet t JOIN Location l ON t.location_id = l.location_id WHERE t.status = 'Under Maintenance' ORDER BY t.toilet_id"
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching maintenance toilets:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update toilet status
router.put('/:id/status', async function(req, res) {
  try {
    const { status } = req.body;
    await pool.query(
      'UPDATE Toilet SET status = ? WHERE toilet_id = ?',
      [status, req.params.id]
    );
    res.json({ message: 'Toilet status updated successfully' });
  } catch (err) {
    console.error('Error updating toilet status:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
