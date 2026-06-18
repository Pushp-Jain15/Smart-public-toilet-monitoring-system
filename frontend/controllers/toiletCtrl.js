app.controller('ToiletCtrl', function($scope, $rootScope, $http) {
  var API = 'http://localhost:3000/api';
  $rootScope.pageTitle = 'Toilets';
  $scope.toilets = [];
  $scope.activeTab = 'all';
  $scope.searchText = '';

  $scope.loadToilets = function(tab) {
    $scope.activeTab = tab || 'all';
    var url = API + '/toilets';
    if ($scope.activeTab === 'active') url = API + '/toilets/active';
    else if ($scope.activeTab === 'maintenance') url = API + '/toilets/maintenance';

    $http.get(url).then(function(res) {
      $scope.toilets = res.data;
      $scope.totalCount = res.data.length;
      $scope.activeCount = res.data.filter(function(t) { return t.status === 'Active'; }).length;
      $scope.maintenanceCount = res.data.filter(function(t) { return t.status === 'Under Maintenance'; }).length;
    });
  };

  $scope.toggleStatus = function(toilet) {
    var newStatus = toilet.status === 'Active' ? 'Under Maintenance' : 'Active';
    $http.put(API + '/toilets/' + toilet.toilet_id + '/status', { status: newStatus }).then(function() {
      $scope.loadToilets($scope.activeTab);
    });
  };

  $scope.loadToilets('all');
});
