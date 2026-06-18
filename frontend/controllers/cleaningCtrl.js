app.controller('CleaningCtrl', function($scope, $rootScope, $http) {
  var API = 'http://localhost:3000/api';
  $rootScope.pageTitle = 'Cleaning Records';
  $scope.records = [];
  $scope.summary = [];
  $scope.toilets = [];
  $scope.staffList = [];
  $scope.showForm = false;
  $scope.newRecord = { toilet_id: '', staff_id: '', cleaning_time: '', remarks: '' };

  $scope.loadRecords = function() {
    $http.get(API + '/cleaning').then(function(res) {
      $scope.records = res.data;
    });
  };

  $scope.loadSummary = function() {
    $http.get(API + '/cleaning/summary').then(function(res) {
      $scope.summary = res.data;
      // Find max for bar width calculations
      $scope.maxCleanings = 0;
      res.data.forEach(function(s) {
        if (s.total_cleanings > $scope.maxCleanings) $scope.maxCleanings = s.total_cleanings;
      });
    });
  };

  $scope.loadDropdowns = function() {
    $http.get(API + '/toilets').then(function(res) {
      $scope.toilets = res.data;
    });
    $http.get(API + '/staff').then(function(res) {
      $scope.staffList = res.data;
    });
  };

  $scope.toggleForm = function() {
    $scope.showForm = !$scope.showForm;
    if ($scope.showForm) {
      $scope.loadDropdowns();
    }
  };

  $scope.addRecord = function() {
    if (!$scope.newRecord.toilet_id || !$scope.newRecord.staff_id || !$scope.newRecord.cleaning_time) {
      alert('Please fill required fields');
      return;
    }
    $http.post(API + '/cleaning', $scope.newRecord).then(function() {
      $scope.newRecord = { toilet_id: '', staff_id: '', cleaning_time: '', remarks: '' };
      $scope.showForm = false;
      $scope.loadRecords();
      $scope.loadSummary();
    }).catch(function(err) {
      alert('Error adding record: ' + (err.data ? err.data.error : 'Unknown error'));
    });
  };

  $scope.getBarWidth = function(count) {
    if ($scope.maxCleanings === 0) return '20px';
    return Math.max(20, (count / $scope.maxCleanings) * 200) + 'px';
  };

  $scope.getShiftBadge = function(shift) {
    if (shift === 'Morning') return 'badge-yellow';
    if (shift === 'Evening') return 'badge-blue';
    if (shift === 'Night') return 'badge-purple';
    return '';
  };

  $scope.loadRecords();
  $scope.loadSummary();
});
