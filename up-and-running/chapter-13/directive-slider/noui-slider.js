angular.module('sliderApp')
  .directive('noUiSlider', [function() {
    return {
      restrict: 'E',
      require: 'ngModel',
      link: function($scope, $element, $attrs, ngModelCtrl) {
        $element.noUiSlider({
          // We might not have the initial value in ngModelCtrl yet
          start: 0,
          range: {
            // $attrs by default gives us string values
            // nouiSlider expects numbers, so convert
            min: Number($attrs.rangeMin),
            max: Number($attrs.rangeMax)
          }
        });

        // When data changes inside AngularJS
        // Notify the third party directive of the change
        ngModelCtrl.$render = function() {
          var givenValue = ngModelCtrl.$viewValue;
          if (ngModelCtrl.$viewValue < $attrs.rangeMin) {
            $element.val($attrs.rangeMin);
          } else if (ngModelCtrl.$viewValue > $attrs.rangeMax) {
            $element.val($attrs.rangeMax);
          } else {
            $element.val(givenValue);
          }
        };

        // When data changes outside of AngularJS
        $element.on('set', function(args) {
          // Also tell AngularJS that it needs to update the UI
          $scope.$apply(function() {
            // Set the data within AngularJS
            ngModelCtrl.$setViewValue($element.val());
          });
        });
      }
    };
  }]);
