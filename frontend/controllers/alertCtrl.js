app.controller('AlertCtrl', function($scope, $rootScope, $http) {
  var API = 'http://localhost:3000/api';
  $rootScope.pageTitle = 'Alerts';
  $scope.allAlerts = [];
  $scope.pendingAlerts = [];
  $scope.resolvedAlerts = [];
  $scope.activeTab = 'pending';

  $scope.loadAlerts = function() {
    $http.get(API + '/alerts').then(function(res) {
      $scope.allAlerts = res.data;
      $scope.pendingAlerts = res.data.filter(function(a) { return a.alert_status === 'Pending'; });
      $scope.resolvedAlerts = res.data.filter(function(a) { return a.alert_status === 'Resolved'; });
      $rootScope.pendingAlertCount = $scope.pendingAlerts.length;
    });
  };

  $scope.resolve = function(id) {
    $http.put(API + '/alerts/' + id + '/resolve').then(function() {
      $scope.loadAlerts();
    });
  };

  $scope.deleteAlert = function(id) {
    if (confirm('Delete this alert?')) {
      $http.delete(API + '/alerts/' + id).then(function() {
        $scope.loadAlerts();
      });
    }
  };

  $scope.setTab = function(tab) {
    $scope.activeTab = tab;
  };

  $scope.loadAlerts();
});
