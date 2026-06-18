app.controller('DashboardCtrl', function($scope, $rootScope, $http, $timeout, $interval) {
  var API = 'http://localhost:3000/api';
  $rootScope.pageTitle = 'Dashboard';
  $scope.stats = {};
  $scope.recentAlerts = [];

  var sensorChart = null;
  var toiletChart = null;

  function loadStats() {
    $http.get(API + '/dashboard/stats').then(function(res) {
      $scope.stats = res.data;
      $scope.recentAlerts = res.data.recentAlerts || [];
      $rootScope.pendingAlertCount = res.data.pendingAlerts;
      renderCharts();
    });
  }

  function renderCharts() {
    $timeout(function() {
      // Destroy old charts if they exist
      if (sensorChart) sensorChart.destroy();
      if (toiletChart) toiletChart.destroy();

      // Bar chart — Avg sensor readings
      var ctx1 = document.getElementById('sensorChart');
      if (ctx1) {
        sensorChart = new Chart(ctx1.getContext('2d'), {
          type: 'bar',
          data: {
            labels: ['Gas', 'Water', 'Temperature'],
            datasets: [{
              label: 'Average Reading',
              data: [
                $scope.stats.avgReadingGas || 0,
                $scope.stats.avgReadingWater || 0,
                $scope.stats.avgReadingTemp || 0
              ],
              backgroundColor: ['#f59e0b', '#3b82f6', '#ef4444'],
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // Doughnut — Toilet status
      var ctx2 = document.getElementById('toiletStatusChart');
      if (ctx2) {
        toiletChart = new Chart(ctx2.getContext('2d'), {
          type: 'doughnut',
          data: {
            labels: ['Active', 'Under Maintenance'],
            datasets: [{
              data: [
                $scope.stats.activeToilets || 0,
                $scope.stats.maintenanceToilets || 0
              ],
              backgroundColor: ['#10b981', '#f59e0b'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: { position: 'bottom', labels: { padding: 16, font: { size: 12 } } }
            },
            cutout: '65%'
          }
        });
      }
    }, 100);
  }

  $scope.resolveAlert = function(id) {
    $http.put(API + '/alerts/' + id + '/resolve').then(function() {
      loadStats();
    });
  };

  loadStats();
  var refreshInterval = $interval(loadStats, 30000);

  $scope.$on('$destroy', function() {
    $interval.cancel(refreshInterval);
    if (sensorChart) sensorChart.destroy();
    if (toiletChart) toiletChart.destroy();
  });
});
