app.controller('StaffCtrl', function($scope, $rootScope, $http) {
  var API = 'http://localhost:3000/api';
  $rootScope.pageTitle = 'Maintenance Staff';
  $scope.staff = [];
  $scope.activeShift = 'all';
  $scope.showForm = false;
  $scope.newStaff = { staff_name: '', phone: '', Shift: 'Morning' };

  $scope.loadStaff = function(shift) {
    $scope.activeShift = shift || 'all';
    var url = API + '/staff';
    if ($scope.activeShift !== 'all') {
      url = API + '/staff/shift/' + $scope.activeShift;
    }
    $http.get(url).then(function(res) {
      $scope.staff = res.data;
    });
  };

  $scope.toggleForm = function() {
    $scope.showForm = !$scope.showForm;
  };

  $scope.addStaff = function() {
    if (!$scope.newStaff.staff_name || !$scope.newStaff.phone) {
      alert('Please fill all fields');
      return;
    }
    $http.post(API + '/staff', $scope.newStaff).then(function() {
      $scope.newStaff = { staff_name: '', phone: '', Shift: 'Morning' };
      $scope.showForm = false;
      $scope.loadStaff($scope.activeShift);
    }).catch(function(err) {
      alert('Error adding staff: ' + (err.data ? err.data.error : 'Unknown error'));
    });
  };

  $scope.getShiftBadge = function(shift) {
    if (shift === 'Morning') return 'badge-yellow';
    if (shift === 'Evening') return 'badge-blue';
    if (shift === 'Night') return 'badge-purple';
    return '';
  };

  $scope.loadStaff('all');
});
