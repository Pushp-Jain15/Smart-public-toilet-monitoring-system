const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all cleaning records with staff name and area name
router.get('/', async function(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT cr.clean_id, cr.toilet_id, cr.staff_id, cr.cleaning_time, cr.remarks, " +
      "ms.staff_name, l.area_name " +
      "FROM Cleaning_Record cr " +
      "JOIN Maintenance_Staff ms ON cr.staff_id = ms.staff_id " +
      "JOIN Toilet t ON cr.toilet_id = t.toilet_id " +
      "JOIN Location l ON t.location_id = l.location_id " +
      "ORDER BY cr.cleaning_time DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching cleaning records:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET cleaning summary - how many cleanings each staff did
router.get('/summary', async function(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT ms.staff_name, ms.Shift, COUNT(*) AS total_cleanings " +
      "FROM Cleaning_Record cr " +
      "JOIN Maintenance_Staff ms ON cr.staff_id = ms.staff_id " +
      "GROUP BY ms.staff_name, ms.Shift " +
      "ORDER BY total_cleanings DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching cleaning summary:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST new cleaning record
router.post('/', async function(req, res) {
  try {
    var toilet_id = req.body.toilet_id;
    var staff_id = req.body.staff_id;
    var cleaning_time = req.body.cleaning_time;
    var remarks = req.body.remarks;
    await pool.query(
      'INSERT INTO Cleaning_Record (toilet_id, staff_id, cleaning_time, remarks) VALUES (?, ?, ?, ?)',
      [toilet_id, staff_id, cleaning_time, remarks]
    );
    res.status(201).json({ message: 'Cleaning record added successfully' });
  } catch (err) {
    console.error('Error adding cleaning record:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
