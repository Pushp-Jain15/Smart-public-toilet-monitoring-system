const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all staff with their cleaning count
router.get('/', async function(req, res) {
  try {
    // Get all staff with cleaning count using LEFT JOIN
    const [rows] = await pool.query(
      'SELECT ms.*, IFNULL(c.total_cleanings, 0) AS total_cleanings ' +
      'FROM Maintenance_Staff ms ' +
      'LEFT JOIN (SELECT staff_id, COUNT(*) AS total_cleanings FROM Cleaning_Record GROUP BY staff_id) c ' +
      'ON ms.staff_id = c.staff_id ' +
      'ORDER BY ms.staff_id'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching staff:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET staff by shift
router.get('/shift/:shift', async function(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT ms.*, IFNULL(c.total_cleanings, 0) AS total_cleanings ' +
      'FROM Maintenance_Staff ms ' +
      'LEFT JOIN (SELECT staff_id, COUNT(*) AS total_cleanings FROM Cleaning_Record GROUP BY staff_id) c ' +
      'ON ms.staff_id = c.staff_id ' +
      'WHERE ms.Shift = ? ' +
      'ORDER BY ms.staff_id',
      [req.params.shift]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching staff by shift:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST new staff
router.post('/', async function(req, res) {
  try {
    var staff_name = req.body.staff_name;
    var phone = req.body.phone;
    var Shift = req.body.Shift;
    await pool.query(
      'INSERT INTO Maintenance_Staff (staff_name, phone, Shift) VALUES (?, ?, ?)',
      [staff_name, phone, Shift]
    );
    res.status(201).json({ message: 'Staff member added successfully' });
  } catch (err) {
    console.error('Error adding staff:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
