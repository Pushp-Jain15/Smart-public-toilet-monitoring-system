app.controller('SensorCtrl', function($scope, $rootScope, $http) {
  var API = 'http://localhost:3000/api';
  $rootScope.pageTitle = 'Sensors & Readings';
  $scope.sensors = [];
  $scope.readings = [];
  $scope.stats = [];
  $scope.sensorTypeFilter = '';

  $scope.loadSensors = function() {
    $http.get(API + '/sensors').then(function(res) {
      $scope.sensors = res.data;
    });
  };

  $scope.loadReadings = function() {
    $http.get(API + '/readings/latest').then(function(res) {
      $scope.readings = res.data;
    });
  };

  $scope.loadStats = function() {
    $http.get(API + '/readings/stats').then(function(res) {
      $scope.stats = res.data;
      $scope.avgGas = 0;
      $scope.avgWater = 0;
      $scope.avgTemp = 0;
      res.data.forEach(function(row) {
        if (row.sensor_type === 'Gas') $scope.avgGas = parseFloat(row.avg_val).toFixed(2);
        else if (row.sensor_type === 'Water') $scope.avgWater = parseFloat(row.avg_val).toFixed(2);
        else if (row.sensor_type === 'Temperature') $scope.avgTemp = parseFloat(row.avg_val).toFixed(2);
      });
    });
  };

  $scope.isThresholdViolation = function(reading) {
    if (reading.sensor_type === 'Gas' && reading.reading_value > 500) return true;
    if (reading.sensor_type === 'Water' && reading.reading_value < 30) return true;
    if (reading.sensor_type === 'Temperature' && reading.reading_value > 35) return true;
    return false;
  };

  $scope.getSensorTypeBadge = function(type) {
    if (type === 'Gas') return 'badge-yellow';
    if (type === 'Water') return 'badge-blue';
    if (type === 'Temperature') return 'badge-red';
    return '';
  };

  $scope.loadSensors();
  $scope.loadReadings();
  $scope.loadStats();
});
