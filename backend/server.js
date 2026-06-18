const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API Routes
app.use('/api/locations', require('./routes/location'));
app.use('/api/toilets', require('./routes/toilet'));
app.use('/api/sensors', require('./routes/sensor'));
app.use('/api/readings', require('./routes/sensorReading'));
app.use('/api/alerts', require('./routes/alert'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/cleaning', require('./routes/cleaning'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Fallback: serve index.html for SPA
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, function() {
  console.log('SPTMS server running on http://localhost:' + PORT);
});
