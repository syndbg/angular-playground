angular.module('simpleCtrl2App', [])
  .controller('SimpleCtrl2', ['$location', function($location) {
    var self = this;
    self.navigate1 = function() {
      $location.path('/home');
    };
    self.navigate2 = function() {
      $location.path('/about');
    };
  }]);
