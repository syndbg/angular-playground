angular.module('googleChartApp', [])
  .controller('MainCtrl', ['$scope', function($scope) {
    $scope.pieChartConfig = {
      title: 'One Two Three Chart',
      firstColumnHeader: 'Counter',
      secondColumnHeader: 'Actual Value'
    };
  }]);
