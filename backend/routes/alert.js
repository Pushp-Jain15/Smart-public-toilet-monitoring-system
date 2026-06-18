const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all alerts with area name
router.get('/', async function(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT a.alert_id, a.toilet_id, a.alert_type, a.alert_time, a.alert_status, l.area_name " +
      "FROM Alert a " +
      "JOIN Toilet t ON a.toilet_id = t.toilet_id " +
      "JOIN Location l ON t.location_id = l.location_id " +
      "ORDER BY a.alert_time DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching alerts:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET pending alerts only
router.get('/pending', async function(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT a.alert_id, a.toilet_id, a.alert_type, a.alert_time, a.alert_status, l.area_name " +
      "FROM Alert a " +
      "JOIN Toilet t ON a.toilet_id = t.toilet_id " +
      "JOIN Location l ON t.location_id = l.location_id " +
      "WHERE a.alert_status = 'Pending' " +
      "ORDER BY a.alert_time DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching pending alerts:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT - resolve an alert (change status to Resolved)
router.put('/:id/resolve', async function(req, res) {
  try {
    await pool.query(
      "UPDATE Alert SET alert_status = 'Resolved' WHERE alert_id = ?",
      [req.params.id]
    );
    res.json({ message: 'Alert resolved successfully' });
  } catch (err) {
    console.error('Error resolving alert:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE - remove an alert
router.delete('/:id', async function(req, res) {
  try {
    await pool.query('DELETE FROM Alert WHERE alert_id = ?', [req.params.id]);
    res.json({ message: 'Alert deleted successfully' });
  } catch (err) {
    console.error('Error deleting alert:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
