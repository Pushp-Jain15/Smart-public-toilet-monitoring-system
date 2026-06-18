app.controller('LocationCtrl', function($scope, $rootScope, $http) {
  var API = 'http://localhost:3000/api';
  $rootScope.pageTitle = 'Locations';
  $scope.locations = [];
  $scope.showForm = false;
  $scope.searchText = '';
  $scope.newLocation = { area_name: '', city: '', pincode: '' };

  $scope.loadLocations = function() {
    $http.get(API + '/locations').then(function(res) {
      $scope.locations = res.data;
    });
  };

  $scope.toggleForm = function() {
    $scope.showForm = !$scope.showForm;
  };

  $scope.addLocation = function() {
    if (!$scope.newLocation.area_name || !$scope.newLocation.city || !$scope.newLocation.pincode) {
      alert('Please fill all fields');
      return;
    }
    $http.post(API + '/locations', $scope.newLocation).then(function() {
      $scope.newLocation = { area_name: '', city: '', pincode: '' };
      $scope.showForm = false;
      $scope.loadLocations();
    }).catch(function(err) {
      alert('Error adding location: ' + (err.data ? err.data.error : 'Unknown error'));
    });
  };

  $scope.loadLocations();
});
