var app = angular.module('sptmsApp', ['ngRoute']);

// Route configuration
app.config(function($routeProvider) {
  $routeProvider
    .when('/dashboard',  { templateUrl: 'views/dashboard.html',  controller: 'DashboardCtrl' })
    .when('/locations',  { templateUrl: 'views/locations.html',  controller: 'LocationCtrl' })
    .when('/toilets',    { templateUrl: 'views/toilets.html',    controller: 'ToiletCtrl' })
    .when('/sensors',    { templateUrl: 'views/sensors.html',    controller: 'SensorCtrl' })
    .when('/alerts',     { templateUrl: 'views/alerts.html',     controller: 'AlertCtrl' })
    .when('/staff',      { templateUrl: 'views/staff.html',      controller: 'StaffCtrl' })
    .when('/cleaning',   { templateUrl: 'views/cleaning.html',   controller: 'CleaningCtrl' })
    .otherwise({ redirectTo: '/dashboard' });
});

// Root controller for shared state
app.run(function($rootScope, $location, $http, $interval) {
  $rootScope.pageTitle = 'Dashboard';
  $rootScope.currentTime = new Date();
  $rootScope.pendingAlertCount = 0;

  // Update time every second
  $interval(function() {
    $rootScope.currentTime = new Date();
  }, 1000);

  // Active nav helper
  $rootScope.isActive = function(path) {
    return $location.path() === path;
  };

  // Load pending alert count for sidebar badge
  function loadAlertCount() {
    $http.get('http://localhost:3000/api/alerts/pending').then(function(res) {
      $rootScope.pendingAlertCount = res.data.length;
    }).catch(function() {
      $rootScope.pendingAlertCount = 0;
    });
  }

  loadAlertCount();
  $interval(loadAlertCount, 30000);

  // Update page title on route change
  $rootScope.$on('$routeChangeSuccess', function() {
    // Title is set by each controller
  });
});
