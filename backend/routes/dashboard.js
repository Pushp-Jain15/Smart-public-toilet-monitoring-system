const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET dashboard stats
router.get('/stats', async function(req, res) {
  try {
    // Simple COUNT queries
    var [r1] = await pool.query("SELECT COUNT(*) AS total FROM Toilet");
    var [r2] = await pool.query("SELECT COUNT(*) AS total FROM Toilet WHERE status = 'Active'");
    var [r3] = await pool.query("SELECT COUNT(*) AS total FROM Toilet WHERE status = 'Under Maintenance'");
    var [r4] = await pool.query("SELECT COUNT(*) AS total FROM Alert WHERE alert_status = 'Pending'");
    var [r5] = await pool.query("SELECT COUNT(*) AS total FROM Alert WHERE alert_status = 'Resolved'");
    var [r6] = await pool.query("SELECT COUNT(*) AS total FROM Maintenance_Staff");
    var [r7] = await pool.query("SELECT COUNT(*) AS total FROM Cleaning_Record");

    // Average readings using JOIN and GROUP BY
    var [avgResult] = await pool.query(
      "SELECT s.sensor_type, AVG(sr.reading_value) AS avg_val " +
      "FROM Sensor_Reading sr JOIN Sensor s ON sr.sensor_id = s.sensor_id " +
      "GROUP BY s.sensor_type"
    );

    var avgGas = 0, avgWater = 0, avgTemp = 0;
    avgResult.forEach(function(row) {
      if (row.sensor_type === 'Gas') avgGas = parseFloat(parseFloat(row.avg_val).toFixed(2));
      if (row.sensor_type === 'Water') avgWater = parseFloat(parseFloat(row.avg_val).toFixed(2));
      if (row.sensor_type === 'Temperature') avgTemp = parseFloat(parseFloat(row.avg_val).toFixed(2));
    });

    // Recent 10 alerts using JOIN
    var [alertResult] = await pool.query(
      "SELECT a.alert_id, a.toilet_id, a.alert_type, a.alert_time, a.alert_status, l.area_name " +
      "FROM Alert a " +
      "JOIN Toilet t ON a.toilet_id = t.toilet_id " +
      "JOIN Location l ON t.location_id = l.location_id " +
      "ORDER BY a.alert_time DESC LIMIT 10"
    );

    // Build the response
    var stats = {
      totalToilets: r1[0].total,
      activeToilets: r2[0].total,
      maintenanceToilets: r3[0].total,
      pendingAlerts: r4[0].total,
      resolvedAlerts: r5[0].total,
      totalStaff: r6[0].total,
      totalCleanings: r7[0].total,
      avgReadingGas: avgGas,
      avgReadingWater: avgWater,
      avgReadingTemp: avgTemp,
      recentAlerts: alertResult
    };

    res.json(stats);
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
