angular.module('googleChartApp')
  .directive('pieChart', ['googleChartLoaderPromise',
    function(googleChartLoaderPromise) {
      function convertToPieChartDataTableFormat(firstColumnName, secondColumnName, data) {
        var pieChartArray = [[firstColumnName, secondColumnName]];

        angular.forEach(data, function(value){
          pieChartArray.push([value.label, value.value]);
        });

        return google.visualization.arrayToDataTable(pieChartArray);
      }

      return {
        restrict: 'A',
        scope: false,
        link: function($scope, $element) {
          googleChartLoaderPromise.then(function() {
            var chart = new google.visualization.PieChart($element[0]);

            $scope.$watch('chartData', function(newVal, oldVal) {
              var config = $scope.pieChartConfig;
              if (newVal) {
                var data = [];
                angular.forEach(newVal, function(value, key){
                  data.push({"label": key, "value": Number(value)});
                });
                chart.draw(
                  convertToPieChartDataTableFormat(
                    config.firstColumnHeader,
                    config.secondColumnHeader,
                    data
                  ),
                  {title: config.title}
                );
              }
            }, true);
          });
        }
      };
  }]
 );
